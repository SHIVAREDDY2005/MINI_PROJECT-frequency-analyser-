<template>
  <div class="video-wrapper">
    <!-- BACKGROUND VIDEO -->
<video autoplay muted loop playsinline class="bg-video">
  <source src="/bg.mp4" type="video/mp4" />
</video>

    <!-- DARK OVERLAY -->
    <div class="bg-overlay"></div>

    <!-- APP CONTENT -->
    <div class="page">
      <!-- NAVBAR -->
      <nav class="navbar">
        <div class="logo">🧠 Exam Pipeline</div>
        <div class="nav-links">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </nav>

      <!-- MAIN CARD -->
      <div class="card">
        <h1>Exam Question Processing Pipeline</h1>
        <p class="subtitle">
          Upload PDFs or Images · Auto Processing · Semantic Frequency
        </p>

        <label>Number of documents</label>
        <input type="number" min="1" v-model="numDocs" />

        <DocumentUploader
          v-for="i in numDocs"
          :key="i"
          :index="i - 1"
          @saved="onSaved"
        />

        <button
          class="primary-btn"
          :disabled="!savedDocs.length"
          @click="runPipeline"
        >
          🚀 Run Full Pipeline
        </button>

        <p v-if="status" class="status">{{ status }}</p>
      </div>

      <!-- RESULTS -->
      <div class="card" v-if="finalPdf">
        <h2>Results</h2>

        <button class="secondary-btn" @click="downloadFinalPdf">
          📥 Download Final PDF
        </button>

        <button class="secondary-btn" @click="downloadFreqJson">
          📥 Download Frequency JSON
        </button>
      </div>

      <!-- SESSION FILES -->
      <div class="card small">
        <h3>📂 Recently Uploaded PDFs</h3>
        <ul>
          <li v-for="p in savedDocs" :key="p">{{ p }}</li>
        </ul>
      </div>

      <footer>
        © 2026 Exam Pipeline · Powered by RAG Raiders
      </footer>
    </div>
  </div>
</template>




<script setup>
import { ref } from "vue";
import DocumentUploader from "./components/DocumentUploader.vue";
import api from "./services/api";

const numDocs = ref(1);
const savedDocs = ref([]);
const savedOnce = new Set();

const status = ref("");
const finalPdf = ref(null);
const freqJson = ref(null);

function onSaved(path, key) {
  if (!savedOnce.has(key)) {
    savedDocs.value.push(path);
    savedOnce.add(key);
  }
}

// ---------------- DOWNLOAD FINAL PDF ----------------
async function downloadFinalPdf() {
  const res = await api.get("/download", {
    params: { path: finalPdf.value },
    responseType: "blob",
  });

  const blob = new Blob([res.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Exam_Frequency_Report.pdf";
  a.click();

  window.URL.revokeObjectURL(url);
}

// ---------------- DOWNLOAD FREQUENCY JSON ----------------
async function downloadFreqJson() {
  const res = await api.get("/download", {
    params: { path: freqJson.value },
    responseType: "blob",
  });

  const blob = new Blob([res.data], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "output_frequency.json";
  a.click();

  window.URL.revokeObjectURL(url);
}

// ---------------- RUN PIPELINE ----------------
async function runPipeline() {
  if (!savedDocs.value.length) {
    alert("Please upload images or PDFs first");
    return;
  }

  const start = await api.post("/run-pipeline", savedDocs.value);
  const jobId = start.data.job_id;

  status.value = "🚀 Pipeline running...";

  let tries = 0;
  while (tries < 300) { // ~5 minutes max
    const res = await api.get(`/job-status/${jobId}`);
    status.value = res.data.status;

    if (status.value.startsWith("❌")) return;

    if (status.value.includes("Completed")) {
      finalPdf.value = res.data.result.final_pdf;
      freqJson.value = res.data.result.frequency_json;
      break;
    }

    await new Promise(r => setTimeout(r, 1000));
    tries++;
  }
}
</script>


