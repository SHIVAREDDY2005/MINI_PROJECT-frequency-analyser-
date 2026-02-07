<template>
  <div class="doc">
    <h3>Document {{ index + 1 }}</h3>

    <!-- IMAGES -->
    <p><b>Add images (auto-convert)</b></p>
    <input
      type="file"
      multiple
      accept="image/png,image/jpeg"
      @change="autoConvertImages"
    />

    <ul v-if="images.length">
      <li v-for="img in images" :key="img.name">
        🖼️ {{ img.name }}
      </li>
    </ul>

    <!-- PDF -->
    <p><b>OR upload a PDF (auto-save)</b></p>
    <input
      type="file"
      accept="application/pdf"
      @change="autoSavePdf"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";

const props = defineProps({ index: Number });
const emit = defineEmits(["saved"]);

const images = ref([]);

/* 🔥 AUTO-CONVERT IMAGES */
async function autoConvertImages(e) {
  const selected = Array.from(e.target.files);
  if (!selected.length) return;

  images.value = selected;

  const form = new FormData();
  selected.forEach(img => form.append("files", img));

  const key =
    `img_${props.index}_` +
    selected.map(i => i.name).join(",");

  try {
    const res = await api.post("/images-to-pdf", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // 🔑 THIS ENABLES THE BUTTON
    emit("saved", res.data.path, key);
  } catch (err) {
    console.error("Image upload failed:", err);
    alert("Image upload failed");
  }

  images.value = [];
  e.target.value = "";
}

/* 🔥 AUTO-SAVE PDF */
async function autoSavePdf(e) {
  const file = e.target.files[0];
  if (!file) return;

  const form = new FormData();
  form.append("file", file);

  const key = `pdf_${props.index}_${file.name}`;

  try {
    const res = await api.post("/save-pdf", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // 🔑 THIS ENABLES THE BUTTON
    emit("saved", res.data.path, key);
  } catch (err) {
    console.error("PDF upload failed:", err);
    alert("PDF upload failed");
  }

  e.target.value = "";
}
</script>
