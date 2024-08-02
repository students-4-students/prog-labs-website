import { loadAsync, type JSZipObject } from 'jszip';

const noTrailingSlash = ([name]: [string, JSZipObject]) => !name.endsWith('/');

/**
 * Reads content of a zip file using jszip.
 * @param url url of the zip file
 * @returns object with file path and file contents
 */
async function readZipFile(
  url: string,
  sanitizeFileName: (filename: string) => string,
) {
  try {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    const results: { [id: string]: string } = {};
    const zip = await loadAsync(data);
    const files = Object.entries(zip.files);
    for (const [filename, file] of files.filter(noTrailingSlash))
      results[sanitizeFileName(filename)] = await file.async('text');
    return results;
  } catch (error) {
    console.error(error);
    return {};
  }
}

/**
 * Loads the python type definitions files from the server.
 * @returns the python type definitions files
 */
export async function loadTypeDefinitionFiles() {
  const tryPrependSlash = (filename: string) =>
    filename.replace(/^(stdlib|stubs)/, '/$1');
  return await readZipFile(
    '/language-servers/python/stdlib-source-with-typeshed-pyi.zip',
    tryPrependSlash,
  );
}
