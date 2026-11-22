// Gaming benchmark bands relative to the i5-12400F and Ryzen 5 5600 floor.
// Intel keys drop K/KF/KS/F suffixes. Sources: Tom's Hardware's Ryzen 5 5600
// review, CPU hierarchies, and TechSpot's 11400F, 12400F and 5600 testing.
const cpuBands = {
  above: [
    "285", "265", "245", "235", "225", "14900", "14700", "14600", "14500", "14400",
    "13900", "13700", "13600", "12900", "12700", "12600",
    "9950x3d", "9950x", "9900x3d", "9900x", "9850x3d", "9800x3d", "9700x", "9600x", "9600",
    "7950x3d", "7950x", "7900x3d", "7900x", "7900", "7800x3d", "7700", "7700x",
    "7600x3d", "7600", "7600x", "7500f", "5800x3d", "5700x3d", "5600x3d", "5950x", "5900x",
  ],
  near: [
    "12400", "12500", "13400", "13500", "11900", "11700", "11600",
    "5800x", "5700x", "5600", "5600x", "8700g", "8600g",
  ],
  below: [
    "14100", "13100", "12100", "11400", "10900", "10700", "10600", "10400", "10100",
    "9900", "9700", "8700", "5600g", "5500", "3950x", "3900x", "3800x", "3700x",
    "3600", "3600x", "2700x", "2600", "2600x", "1600",
  ],
};

// Bands use Tom's Hardware desktop rasterization tests. The floor is the
// RTX 3060 8 GB or a ray tracing capable AMD/Intel equivalent.
const gpuBands = {
  above: [
    "rtx 5090", "rtx 5080", "rtx 5070 ti", "rtx 5070", "rtx 5060 ti 16gb",
    "rtx 5060 ti 8gb", "rtx 5060", "rtx 4090", "rtx 4080 super", "rtx 4080",
    "rtx 4070 ti super", "rtx 4070 ti", "rtx 4070 super", "rtx 4070",
    "rtx 4060 ti 16gb", "rtx 4060 ti 8gb", "rtx 3090 ti", "rtx 3090",
    "rtx 3080 ti", "rtx 3080", "rtx 3070 ti", "rtx 3070",
    "rx 9070 xt", "rx 9070", "rx 9070 gre", "rx 9060 xt 16gb", "rx 9060 xt 8gb",
    "rx 7900 xtx", "rx 7900 xt", "rx 7900 gre", "rx 7800 xt", "rx 7700 xt",
    "rx 7600 xt", "rx 6950 xt", "rx 6900 xt", "rx 6800 xt", "rx 6800",
  ],
  near: [
    "rtx 5050", "rtx 4060", "rtx 3060 ti", "rtx 3060 12gb", "rtx 3060 8gb", "rtx 3060",
    "rtx 2080 ti", "rtx 2060 super", "rx 6600", "arc a770 8gb", "arc a770",
    "rtx 2080 super", "rtx 2070 super", "rtx 2070", "rx 7600", "rx 6750 xt",
    "rx 6700 xt", "rx 6700", "rx 6650 xt", "rx 6600 xt", "arc b580", "arc b570",
    "arc a770 16gb", "arc a750",
  ],
  below: ["gtx 1650 super", "gtx 1660", "rx 5500 xt", "rtx 3050 8gb", "rtx 3050 6gb", "rtx 3050", "rtx 2060", "rx 6500 xt"],
};

// Approximate desktop gaming bands around the community's Series X examples.
// A CPU or GPU band describes benchmark proximity, not a Leonida requirement.
const seriesXCpuNear = ["3700x", "3800x", "3900x", "3950x", "5600", "11400", "11700", "11600",
  "10900", "10700", "10600", "9900", "9700", "14100", "13100", "12100", "5600g", "5500"];
const seriesXCpuBands = {
  above: [...cpuBands.above, ...cpuBands.near].filter(model => !seriesXCpuNear.includes(model)),
  near: seriesXCpuNear,
  below: ["10400", "10100", "3600", "3600x", "2700x", "2600", "2600x", "1600", "8700"],
};
const seriesXGpuBands = {
  above: gpuBands.above.filter(model => ![
    "rtx 5060 ti 16gb", "rtx 5060 ti 8gb", "rtx 5060", "rtx 4060 ti 16gb",
    "rtx 4060 ti 8gb", "rtx 3070 ti", "rtx 3070", "rx 9060 xt 16gb",
    "rx 9060 xt 8gb", "rx 7600 xt", "rx 6800",
  ].includes(model)),
  near: [
    "rtx 5060 ti 16gb", "rtx 5060 ti 8gb", "rtx 5060", "rtx 4060 ti 16gb",
    "rtx 4060 ti 8gb", "rtx 3070 ti", "rtx 3070", "rtx 3060 ti", "rtx 2080 ti",
    "rx 9060 xt 16gb", "rx 9060 xt 8gb", "rx 7600 xt", "rx 6800", "rx 6750 xt", "rx 6700 xt",
    "rtx 4060", "rtx 2080 super", "rx 6700", "arc b580",
  ],
  below: [...gpuBands.below, "rtx 5050", "rtx 3060 12gb", "rtx 3060 8gb", "rtx 3060", "rtx 2070 super",
    "rtx 2070", "rtx 2060 super", "rx 7600", "rx 6650 xt", "rx 6600 xt", "rx 6600", "arc b570",
    "arc a770 16gb", "arc a770 8gb", "arc a770", "arc a750"],
};

// Additional ranges follow the community examples, with broad desktop bands.
const ps5GpuBands = {
  above: seriesXGpuBands.above,
  near: [...seriesXGpuBands.near, "rtx 2070 super", "rtx 3060 12gb"],
  below: seriesXGpuBands.below.filter(model => !["rtx 2070 super", "rtx 3060 12gb"].includes(model)),
};
const proCpuBands = {
  above: seriesXCpuBands.above.filter(model => !["5700x", "5800x"].includes(model)),
  near: [...seriesXCpuBands.near, "5700x", "5800x"],
  below: seriesXCpuBands.below,
};
const proGpuNear = ["rtx 5060 ti 16gb", "rx 9060 xt 16gb", "rtx 3070 ti", "rtx 2080 ti", "rtx 4060 ti 16gb", "rx 6800", "rx 7700 xt"];
const proGpuAbove = seriesXGpuBands.above.filter(model => !proGpuNear.includes(model));
const proGpuBands = {
  above: proGpuAbove,
  near: proGpuNear,
  uncertain: ["rtx 5060 ti 8gb", "rx 9060 xt 8gb", "rtx 4060 ti 8gb"],
  below: [...new Set([...gpuBands.above, ...gpuBands.near, ...gpuBands.below])].filter(model =>
    ![...proGpuAbove, ...proGpuNear, "rtx 5060 ti 8gb", "rx 9060 xt 8gb", "rtx 4060 ti 8gb"].includes(model)),
};
const seriesSCpuBands = {
  above: [...new Set([...seriesXCpuBands.above, ...seriesXCpuBands.near])],
  near: ["3600", "3600x", "2700x", "10400", "8700"],
  below: ["10100", "2600", "2600x", "1600"],
};
const seriesSGpuBands = {
  above: [...gpuBands.above, ...gpuBands.near, ...gpuBands.below].filter(model => !["gtx 1650 super", "gtx 1660", "rx 5500 xt"].includes(model)),
  near: ["gtx 1650 super", "gtx 1660", "rx 5500 xt"],
  below: ["gtx 1650", "gtx 1050 ti", "rx 560"],
};
const consoleRanges = {
  "series-x": { name: "Series X", CPU: seriesXCpuBands, GPU: seriesXGpuBands },
  ps5: { name: "PS5", CPU: seriesXCpuBands, GPU: ps5GpuBands },
  "ps5-pro": { name: "PS5 Pro", CPU: proCpuBands, GPU: proGpuBands },
  "series-s": { name: "Series S", CPU: seriesSCpuBands, GPU: seriesSGpuBands },
};

const armCpu = /\b(?:snapdragon|arm64|aarch64)\b|\bapple\s+m\d+\b|^m[1-9]\d*(?:\s+(?:pro|max|ultra))?$/i;
const memoryVariants = new Set(["rtx 5060 ti", "rtx 4060 ti", "rtx 3060", "rtx 3050", "rx 9060 xt", "arc a770"]);
const laptopGraphics = /\b(?:laptop|mobile|max[ -]?q)\b/i;

// Published Leonida shader runs in issue #166. Keep desktop and laptop models
// distinct, and keep capacity when the report identifies a specific variant.
const shaderTestPlatforms = new Map([
  ["rtx 5090", "Windows 11 and Linux"],
  ["rtx 5080", "Windows 11"],
  ["rtx 5080 laptop", "Windows 11"],
  ["rtx 5070 ti", "Windows 11"],
  ["rtx 5070", "Windows 11"],
  ["rtx 4090", "Windows 11"],
  ["rtx 4080 super", "Windows 11 and Linux"],
  ["rtx 4080", "Windows 11"],
  ["rtx 4070 ti super", "Windows 11"],
  ["rtx 4070 super", "Windows 11"],
  ["rtx 4060 laptop", "Windows 11"],
  ["rtx 3090", "Windows 11"],
  ["rtx 3080 ti", "Windows"],
  ["rtx 3080", "Windows 11 and Linux"],
  ["rtx 3070", "Windows 11 and Linux"],
  ["rtx 3060 12gb", "Windows 11"],
  ["rtx 3050 laptop", "Windows 11"],
  ["rtx 2080 ti", "Windows 11"],
  ["rtx 2070 super", "Windows 11"],
  ["rtx 2070", "Windows 10"],
  ["rtx 2060 super", "Linux"],
  ["gtx 1060 6gb", "Windows 10 and 11"],
  ["rx 9070 xt", "Windows 11 and Linux"],
  ["rx 9070", "Windows 11"],
  ["rx 7900 xtx", "Windows 11 and Linux"],
  ["rx 7800 xt", "Windows"],
  ["rx 7600", "Windows 11 and Linux"],
  ["rx 6750 xt", "Linux"],
  ["rx 6700 xt", "Linux"],
  ["rx 6700", "Windows 11"],
  ["rx 5700 xt", "Linux"],
  ["arc b580", "Windows"],
]);

export function graphicsMemory(graphics) {
  return graphics.match(/\b(\d+)\s*gb\b/i)?.[1];
}

function cpuKey(processor) {
  if (/\bryzen\b/i.test(processor)) {
    return processor.match(/\b\d{3,5}[a-z\d]*\b/i)?.[0].toLowerCase();
  }
  // K/KF/KS/F share a band; laptop suffixes (H, U, ...) stay unknown
  return processor.match(/\b(?:i[3579]|ultra\s+[579])[\s-]*(\d{3,5})(?:k[fs]?|f)?\b/i)?.[1];
}

function gpuModel(graphics) {
  const model = graphics.match(/\b(rtx|gtx|rx|arc)\s*([ab]\d{3}|\d{4})(?:\s+(ti super|xtx|super|gre|ti|xt))?\b/i);
  return model?.slice(1).filter(Boolean).join(" ").toLowerCase();
}

function gpuKey(graphics) {
  if (laptopGraphics.test(graphics)) return;
  const model = gpuModel(graphics);
  if (!model) return;
  const memory = graphicsMemory(graphics);
  return memoryVariants.has(model) && memory ? `${model} ${memory}gb` : model;
}

export function shaderTestPlatform(graphics) {
  const model = gpuModel(graphics);
  if (!model) return;
  if (laptopGraphics.test(graphics)) return shaderTestPlatforms.get(`${model} laptop`);
  const memory = graphicsMemory(graphics);
  const variant = memory ? shaderTestPlatforms.get(`${model} ${memory}gb`) : undefined;
  return variant ?? shaderTestPlatforms.get(model);
}

function bandFor(key, bands) {
  return Object.keys(bands).find(band => bands[band].includes(key)) ?? "unknown";
}

export function assessHardware(cpu, gpu, ram, reference = "low", ramType = "ddr4") {
  const processor = cpu.trim();
  const graphics = gpu.trim();
  const memory = Number(ram);
  const consoleRange = consoleRanges[reference];
  const consoleComparison = Boolean(consoleRange);
  const ddr5 = ramType === "ddr5";
  const memoryTarget = ddr5 ? 16 : consoleComparison ? 32 : 16;
  let ramStatus = !Number.isFinite(memory) || memory < 1 ? "empty" : "near";
  if (ramStatus !== "empty") {
    if (memory < memoryTarget) ramStatus = consoleComparison || ddr5 ? "uncertain" : "below";
    if (memory > memoryTarget) ramStatus = "above";
  }
  const statuses = {
    CPU: !processor ? "empty" : armCpu.test(processor) ? "outside" : bandFor(cpuKey(processor), consoleRange?.CPU ?? cpuBands),
    GPU: graphics ? bandFor(gpuKey(graphics), consoleRange?.GPU ?? gpuBands) : "empty",
    RAM: ramStatus,
  };

  const parts = Object.values(statuses);
  if (statuses.CPU === "outside") return { verdict: "Your PC is outside Leonida’s x64 target", statuses };
  if (parts.includes("empty")) return { verdict: "Enter your PC specs", statuses };
  if (consoleComparison) {
    const name = consoleRange.name;
    if (parts.includes("below")) return { verdict: `Below the ${name} hardware range`, statuses };
    if (parts.includes("unknown")) return { verdict: `Partial ${name} comparison`, statuses };
    if (parts.includes("uncertain")) return { verdict: `Uncertain ${name} comparison`, statuses };
    if (statuses.CPU === "above" && statuses.GPU === "above") {
      return { verdict: `Above the ${name} hardware range`, statuses };
    }
    return { verdict: `Around the ${name} hardware range`, statuses };
  }
  if (parts.includes("below")) return { verdict: "Your PC may struggle to run Leonida", statuses };
  if (parts.includes("unknown")) return { verdict: "Your PC’s outlook is unclear", statuses };
  if (parts.includes("uncertain")) return { verdict: "Your PC’s outlook is unclear", statuses };
  return { verdict: "Your PC could run Leonida", statuses };
}
