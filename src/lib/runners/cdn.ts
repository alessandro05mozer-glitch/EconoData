// Os executores de Python e R são baixados na primeira vez e ficam guardados no navegador.
// A versão do Pyodide é fixa: o pacote e o CDN precisam ser da mesma versão.
export const PYODIDE_VERSION = '314.0.8'
export const PY_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

export const WEBR_URL = 'https://webr.r-wasm.org/latest/'

/** Tempo máximo de uma execução de Python, depois do runtime carregado */
export const RUN_TIMEOUT_MS = 20_000
