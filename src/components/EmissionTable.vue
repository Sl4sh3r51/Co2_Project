<template>
  <div class="card shadow-sm mb-4">
    <div class="card-header border-0">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h4 class="card-title">CO2-Emissionen nach Land und Unternehmen</h4>
          <p class="card-text text-muted">
            Aktuelle Übersicht der größten Emittenten
          </p>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="d-flex flex-column flex-md-row gap-3 mb-4">
        <div class="input-group flex-grow-1">
          <input
              type="text"
              v-model="searchTerm"
              class="form-control"
              placeholder="Suchen nach Land, Unternehmen oder Sektor..."
          />
          <span class="input-group-text"><i class="bi bi-search"></i></span>
        </div>
        <div class="d-flex gap-3">
          <select v-model="filterType" class="form-select">
            <option value="">Alle Emittenten</option>
            <option value="country">Länder</option>
            <option value="company">Unternehmen</option>
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
          <tr>
            <th scope="col" @click="sortBy('name')" class="cursor-pointer user-select-none">
              Name
              <i v-if="sortKey === 'name'" :class="sortDirection === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
            </th>
            <th scope="col" @click="sortBy('type')" class="cursor-pointer user-select-none">
              Typ
              <i v-if="sortKey === 'type'" :class="sortDirection === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
            </th>
            <th scope="col" @click="sortBy('co2Emissions')" class="cursor-pointer user-select-none">
              CO2-Emissionen (in Mio. Tonnen)
              <i v-if="sortKey === 'co2Emissions'" :class="sortDirection === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
            </th>
            <th scope="col">Sektor / Land</th>
            <th scope="col">Jahr</th>
            <th scope="col" @click="sortBy('trend')" class="cursor-pointer user-select-none">
              Trend
              <i v-if="sortKey === 'trend'" :class="sortDirection === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="filteredAndSortedData.length === 0">
            <td colspan="6" class="text-center text-muted py-4">
              Keine Daten gefunden. Versuchen Sie andere Suchbegriffe oder Filter.
            </td>
          </tr>
          <tr v-else v-for="item in filteredAndSortedData" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
                <span :class="{'badge rounded-pill': true, 'bg-primary': item.type === 'country', 'bg-secondary': item.type === 'company'}">
                  {{ item.type === "country" ? "Land" : "Unternehmen" }}
                </span>
            </td>
            <td>
                <span :class="{'badge rounded-pill': true, 'bg-success': item.co2Emissions < 1000, 'bg-warning': item.co2Emissions >= 1000 && item.co2Emissions < 5000, 'bg-danger': item.co2Emissions >= 5000}">
                  {{ item.co2Emissions.toLocaleString() }}
                </span>
            </td>
            <td class="text-muted">
              {{ item.type === "company" ? `${item.sector} (${item.country})` : "-" }}
            </td>
            <td>{{ item.year }}</td>
            <td>
                <span class="d-flex align-items-center">
                  <i :class="getTrendIconClass(item.trend)"></i>
                  <span class="ms-1">{{ item.trend === "up" ? "steigend" : item.trend === "down" ? "sinkend" : "stabil" }}</span>
                </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DOMPurify from 'dompurify';

interface EmissionData {
  id: string;
  name: string;
  type: "country" | "company";
  co2Emissions: number;
  sector?: string;
  country?: string;
  year: number;
  trend: "up" | "down" | "stable";
}

const mockEmissionsData: EmissionData[] = [
  { id: "1", name: "China", type: "country", co2Emissions: 10175, year: 2023, trend: "up" },
  { id: "2", name: "USA", type: "country", co2Emissions: 4713, year: 2023, trend: "down" },
  { id: "3", name: "Deutschland", type: "country", co2Emissions: 674, year: 2023, trend: "down" },
  { id: "4", name: "Saudi Aramco", type: "company", co2Emissions: 1350, sector: "Oil & Gas", country: "Saudi-Arabien", year: 2023, trend: "stable" },
  { id: "5", name: "Chevron Corporation", type: "company", co2Emissions: 734, sector: "Oil & Gas", country: "USA", year: 2023, trend: "down" },
  { id: "6", name: "Gazprom", type: "company", co2Emissions: 687, sector: "Oil & Gas", country: "Russland", year: 2023, trend: "up" },
  { id: "7", name: "ExxonMobil", type: "company", co2Emissions: 656, sector: "Oil & Gas", country: "USA", year: 2023, trend: "down" },
  { id: "8", name: "Coal India", type: "company", co2Emissions: 612, sector: "Coal", country: "Indien", year: 2023, trend: "up" },
  { id: "9", name: "Indien", type: "country", co2Emissions: 2654, year: 2023, trend: "up" },
  { id: "10", name: "Russland", type: "country", co2Emissions: 2269, year: 2023, trend: "down" },
  { id: "11", name: "Japan", type: "country", co2Emissions: 1147, year: 2023, trend: "down" },
  { id: "12", name: "Kanada", type: "country", co2Emissions: 730, year: 2023, trend: "stable" },
  { id: "13", name: "Brasilien", type: "country", co2Emissions: 476, year: 2023, trend: "up" },
  { id: "14", name: "Australien", type: "country", co2Emissions: 419, year: 2023, trend: "up" },
  { id: "15", name: "Vereinigtes Königreich", type: "country", co2Emissions: 331, year: 2023, trend: "down" },
  { id: "16", name: "Frankreich", type: "country", co2Emissions: 302, year: 2023, trend: "down" },
  { id: "17", name: "Südkorea", type: "country", co2Emissions: 659, year: 2023, trend: "stable" },
  { id: "18", name: "Südafrika", type: "country", co2Emissions: 435, year: 2023, trend: "up" },
  { id: "19", name: "Mexiko", type: "country", co2Emissions: 368, year: 2023, trend: "down" },
  { id: "20", name: "Indonesien", type: "country", co2Emissions: 615, year: 2023, trend: "up" },
  { id: "21", name: "Royal Dutch Shell", type: "company", co2Emissions: 900, sector: "Oil & Gas", country: "Niederlande", year: 2023, trend: "down" },
  { id: "22", name: "BP", type: "company", co2Emissions: 850, sector: "Oil & Gas", country: "UK", year: 2023, trend: "down" },
  { id: "23", name: "TotalEnergies", type: "company", co2Emissions: 790, sector: "Oil & Gas", country: "Frankreich", year: 2023, trend: "stable" },
  { id: "24", name: "RWE", type: "company", co2Emissions: 540, sector: "Energy", country: "Deutschland", year: 2023, trend: "down" },
  { id: "25", name: "Tata Steel", type: "company", co2Emissions: 480, sector: "Steel", country: "Indien", year: 2023, trend: "up" },
  { id: "26", name: "Peabody Energy", type: "company", co2Emissions: 510, sector: "Coal", country: "USA", year: 2023, trend: "down" },
  { id: "27", name: "Glencore", type: "company", co2Emissions: 470, sector: "Mining", country: "Schweiz", year: 2023, trend: "stable" },
  { id: "28", name: "ENI", type: "company", co2Emissions: 430, sector: "Oil & Gas", country: "Italien", year: 2023, trend: "down" },
  { id: "29", name: "Lukoil", type: "company", co2Emissions: 600, sector: "Oil & Gas", country: "Russland", year: 2023, trend: "up" },
  { id: "30", name: "Sasol", type: "company", co2Emissions: 520, sector: "Chemicals", country: "Südafrika", year: 2023, trend: "up" },
];

const searchTerm = ref('');
const filterType = ref('');
const sortKey = ref('name');
const sortDirection = ref('asc');

const filteredData = computed(() => {
  let data = mockEmissionsData;

  if (filterType.value) {
    data = data.filter(item => item.type === filterType.value);
  }

  if (searchTerm.value) {
    computed(() => DOMPurify.sanitize(searchTerm.value));
    data = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        (item.sector && item.sector.toLowerCase().includes(searchTerm.value.toLowerCase())) ||
        (item.country && item.country.toLowerCase().includes(searchTerm.value.toLowerCase()))
    );
  }

  return data;
});

const filteredAndSortedData = computed(() => {
  const data = [...filteredData.value];
  if (sortKey.value) {
    data.sort((a, b) => {
      if (sortKey.value === 'trend') {
        // Sortierreihenfolge für Trend
        const orderAsc = ['down', 'stable', 'up'];
        const orderDesc = ['up', 'stable', 'down'];
        const order = sortDirection.value === 'asc' ? orderAsc : orderDesc;
        const aIndex = order.indexOf(a.trend);
        const bIndex = order.indexOf(b.trend);
        return aIndex - bIndex;
      }
      const aValue = (a as any)[sortKey.value];
      const bValue = (b as any)[sortKey.value];
      if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return data;
});

const sortBy = (key: string) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
};

const getTrendIconClass = (trend: "up" | "down" | "stable") => {
  switch (trend) {
    case 'up':
      return 'bi bi-arrow-up text-danger';
    case 'down':
      return 'bi bi-arrow-down text-success';
    case 'stable':
      return 'bi bi-arrow-left-right text-muted';
    default:
      return '';
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.user-select-none {
  user-select: none;
}
</style>