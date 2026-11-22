import { assessHardware, graphicsMemory } from "./model.mjs?v=5";

const form = document.getElementById("settings");
const verdict = document.getElementById("verdict");
const verdictReason = document.getElementById("verdict-reason");
const estimateLabel = document.getElementById("estimate-label");
const vramNote = document.getElementById("vram-note");
const resultRows = {
  CPU: document.getElementById("cpu-result"),
  GPU: document.getElementById("gpu-result"),
  RAM: document.getElementById("ram-result"),
};
const referenceRows = {
  CPU: document.getElementById("cpu-reference"),
  GPU: document.getElementById("gpu-reference"),
  RAM: document.getElementById("ram-reference"),
};
const references = {
  "series-x": {
    label: "Community Xbox Series X comparison",
    CPU: "Ryzen 7 3700X or Ryzen 5 5600",
    GPU: "RTX 3060 Ti / 3070 or RX 6700 XT / 6800",
    RAM: "32 GB suggested for PCs",
  },
  ps5: {
    label: "Community PS5 comparison",
    CPU: "Ryzen 7 3700X class",
    GPU: "RTX 2070 Super / 3070 or RX 6700 XT",
    RAM: "32 GB suggested for PCs",
  },
  "ps5-pro": {
    label: "Community PS5 Pro comparison",
    CPU: "Ryzen 7 3700X to 5700X class",
    GPU: "RTX 5060 Ti 16 GB or RX 9060 XT 16 GB",
    RAM: "32 GB suggested for PCs",
  },
  "series-s": {
    label: "Community Xbox Series S comparison",
    CPU: "Ryzen 5 3600 class",
    GPU: "GTX 1650 Super / 1660 or RX 5500 XT",
    RAM: "32 GB suggested for PCs",
  },
  low: {
    label: "Community estimate for 1080p Low",
    CPU: "i5‑12400F or Ryzen 5 5600",
    GPU: "RTX 3060 8 GB, RX 6600 or Arc A750 (ray tracing)",
    RAM: "16 GB",
  },
};
const statusLabel = {
  above: "Above",
  near: "In range",
  below: "Below",
  unknown: "Unknown",
  empty: "—",
  outside: "ARM",
  uncertain: "Uncertain",
};
const { cpu, cpuCustom, gpu, gpuCustom, ram, ramSlider, reference, ramType } = form.elements;
const ramPresets = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];

function selectedModel(select, custom) {
  const useCustom = select.value === "custom";
  custom.closest("label").hidden = !useCustom;
  return useCustom ? custom.value : select.value;
}

function update(fromSlider = false) {
  if (!fromSlider && Number.isFinite(ram.valueAsNumber)) {
    const amount = ram.valueAsNumber;
    const nearest = ramPresets.reduce((best, size, index) =>
      Math.abs(size - amount) < Math.abs(ramPresets[best] - amount) ? index : best, 0);
    ramSlider.valueAsNumber = nearest;
  }
  ramSlider.setAttribute("aria-valuetext", `${ramPresets[Math.round(ramSlider.valueAsNumber)]} GB`);
  const processor = selectedModel(cpu, cpuCustom);
  const graphics = selectedModel(gpu, gpuCustom);
  const consoleComparison = reference.value !== "low";
  const baseline = references[reference.value];
  const ramReference = ramType.value === "ddr5"
    ? "DDR5 · 16 GB provisional floor"
    : consoleComparison ? "32 GB DDR4 suggested" : "16 GB DDR4 estimate";
  const result = assessHardware(processor, graphics, ram.value, reference.value, ramType.value);
  if (verdict.textContent !== result.verdict) verdict.textContent = result.verdict;
  if (estimateLabel.textContent !== baseline.label) estimateLabel.textContent = baseline.label;
  const names = { CPU: processor.trim(), GPU: graphics.trim(), RAM: `${ram.value} GB of RAM` };
  const below = Object.keys(names).filter(part => result.statuses[part] === "below");
  const comparison = consoleComparison ? "the reference range" : "the estimate";
  let reason = "";
  if (result.statuses.CPU === "outside") {
    reason = "Leonida currently targets Windows PCs with x64 processors.";
  } else if (below.length === 1) {
    reason = `${names[below[0]]} falls below ${comparison}.`;
  } else if (below.length > 1) {
    reason = `Below ${comparison} for ${new Intl.ListFormat("en").format(below)}.`;
  }
  verdictReason.hidden = !reason;
  if (verdictReason.textContent !== reason) verdictReason.textContent = reason;
  for (const [part, row] of Object.entries(resultRows)) {
    const label = referenceRows[part];
    const referenceText = part === "RAM" ? ramReference : baseline[part];
    if (label.textContent !== referenceText) label.textContent = referenceText;
    const status = result.statuses[part];
    if (row.dataset.status === status) continue;
    row.dataset.status = status;
    row.textContent = statusLabel[status];
  }
  const vram = graphicsMemory(graphics);
  vramNote.hidden = consoleComparison || !vram || Number(vram) >= 8;
  const note = vramNote.hidden ? "" : `VRAM: ${vram} GB selected, 8 GB on the reference card.`;
  if (vramNote.textContent !== note) vramNote.textContent = note;

}

form.addEventListener("input", event => {
  if (event.target === ramSlider) ram.value = String(ramPresets[Math.round(ramSlider.valueAsNumber)]);
  update(event.target === ramSlider);
});
ramSlider.addEventListener("keydown", event => {
  const direction = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[event.key];
  if (!direction) return;
  event.preventDefault();
  ramSlider.value = String(Math.max(0, Math.min(9, Math.round(ramSlider.valueAsNumber) + direction)));
  ramSlider.dispatchEvent(new Event("input", { bubbles: true }));
});
form.addEventListener("submit", event => event.preventDefault());
update();
