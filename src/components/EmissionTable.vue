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
            <th scope="col">Trend</th>
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