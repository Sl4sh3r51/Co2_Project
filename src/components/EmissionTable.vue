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
          <select v-model="filterType" class="form-select" style="min-width: 160px">
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
  { id: "1", name: "Deutschland", type: "country", co2Emissions: 720.4, year: 2023, trend: "down" },
  { id: "2", name: "Frankreich", type: "country", co2Emissions: 410.2, year: 2023, trend: "down" },
  { id: "3", name: "Italien", type: "country", co2Emissions: 360.8, year: 2023, trend: "stable" },
  { id: "4", name: "Spanien", type: "country", co2Emissions: 290.1, year: 2023, trend: "down" },
  { id: "5", name: "Polen", type: "country", co2Emissions: 430.5, year: 2023, trend: "up" },
  { id: "6", name: "USA", type: "country", co2Emissions: 5000.3, year: 2023, trend: "down" },
  { id: "7", name: "Kanada", type: "country", co2Emissions: 670.9, year: 2023, trend: "stable" },
  { id: "8", name: "China", type: "country", co2Emissions: 10800.6, year: 2023, trend: "up" },
  { id: "9", name: "Indien", type: "country", co2Emissions: 2900.2, year: 2023, trend: "up" },
  { id: "10", name: "Japan", type: "country", co2Emissions: 1100.5, year: 2023, trend: "stable" },
  { id: "11", name: "Brasilien", type: "country", co2Emissions: 490.3, year: 2023, trend: "up" },
  { id: "12", name: "Russland", type: "country", co2Emissions: 1500.8, year: 2023, trend: "down" },
  { id: "13", name: "Australien", type: "country", co2Emissions: 410.9, year: 2023, trend: "stable" },
  { id: "14", name: "Südafrika", type: "country", co2Emissions: 390.7, year: 2023, trend: "up" },
  { id: "15", name: "Vereinigtes Königreich", type: "country", co2Emissions: 310.4, year: 2023, trend: "down" },
  { id: "16", name: "GreenTech Energy AG", type: "company", co2Emissions: 42.3, year: 2023, trend: "down", sector: "Energy", country: "Deutschland" },
  { id: "17", name: "EuroSteel GmbH", type: "company", co2Emissions: 58.7, year: 2023, trend: "up", sector: "Industry", country: "Deutschland" },
  { id: "18", name: "BlueAir Lines", type: "company", co2Emissions: 89.4, year: 2023, trend: "up", sector: "Aviation", country: "Frankreich" },
  { id: "19", name: "SolarNova S.p.A.", type: "company", co2Emissions: 12.6, year: 2023, trend: "down", sector: "Renewables", country: "Italien" },
  { id: "20", name: "TransPol Logistics", type: "company", co2Emissions: 33.2, year: 2023, trend: "up", sector: "Transport", country: "Polen" },
  { id: "21", name: "USOil Corp", type: "company", co2Emissions: 470.9, year: 2023, trend: "down", sector: "Energy", country: "USA" },
  { id: "22", name: "CanForest Ltd.", type: "company", co2Emissions: 22.8, year: 2023, trend: "stable", sector: "Forestry", country: "Kanada" },
  { id: "23", name: "SinoSteel Holdings", type: "company", co2Emissions: 590.5, year: 2023, trend: "up", sector: "Industry", country: "China" },
  { id: "24", name: "IndoCement Pvt. Ltd.", type: "company", co2Emissions: 210.3, year: 2023, trend: "up", sector: "Construction", country: "Indien" },
  { id: "25", name: "Nippon Motors", type: "company", co2Emissions: 130.9, year: 2023, trend: "stable", sector: "Automotive", country: "Japan" },
  { id: "26", name: "BioFuel Brasil", type: "company", co2Emissions: 18.2, year: 2023, trend: "down", sector: "Renewables", country: "Brasilien" },
  { id: "27", name: "RusCoal Mining", type: "company", co2Emissions: 350.7, year: 2023, trend: "down", sector: "Mining", country: "Russland" },
  { id: "28", name: "AussieGas Ltd.", type: "company", co2Emissions: 90.1, year: 2023, trend: "stable", sector: "Energy", country: "Australien" },
  { id: "29", name: "CapeSteel Industries", type: "company", co2Emissions: 74.6, year: 2023, trend: "up", sector: "Industry", country: "Südafrika" },
  { id: "30", name: "BritAir Transport", type: "company", co2Emissions: 55.8, year: 2023, trend: "down", sector: "Aviation", country: "Vereinigtes Königreich" }
];

const searchTerm = ref('');
const filterType = ref('');
const sortKey = ref('');
const sortDirection = ref('');

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