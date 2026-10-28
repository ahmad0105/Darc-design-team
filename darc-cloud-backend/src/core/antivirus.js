// DARC Antivirus & Anti-Malware Deep Inspection Engine
// Detects malware signatures, executable magic bytes, script injections, and polyglot files

/**
 * Inspects a binary buffer's magic bytes and leading content for malware, executables, and web shells.
 * @param {ArrayBuffer} buffer - Raw file buffer
 * @returns {{ isMalware: boolean, reason?: string }}
 */
export function inspectFileBuffer(buffer) {
  if (!buffer || buffer.byteLength < 2) return { isMalware: false };

  // Inspect first 64KB of buffer to defeat padding/offset evasion
  const headSize = Math.min(buffer.byteLength, 65536);
  const bytes = new Uint8Array(buffer.slice(0, headSize));

  // 1. Windows PE / Executable Header ("MZ" = 0x4D, 0x5A)
  if (bytes[0] === 0x4D && bytes[1] === 0x5A) {
    return {
      isMalware: true,
      reason: 'محظور أمنياً: تم اكتشاف ترويسة ملف تنفيذي لويندوز (Windows PE / MZ Executable signature detected).'
    };
  }

  // 2. Linux ELF Binary Header (0x7F, 0x45, 0x4C, 0x46)
  if (bytes.length >= 4 && bytes[0] === 0x7F && bytes[1] === 0x45 && bytes[2] === 0x4C && bytes[3] === 0x46) {
    return {
      isMalware: true,
      reason: 'محظور أمنياً: تم اكتشاف ملف تنفيذي لأنظمة لينكس (Linux ELF Binary signature detected).'
    };
  }

  // 3. macOS Mach-O Executable Binary Headers (32-bit & 64-bit Big/Little Endian)
  if (bytes.length >= 4) {
    const b0 = bytes[0], b1 = bytes[1], b2 = bytes[2], b3 = bytes[3];
    const isMachO =
      (b0 === 0xFE && b1 === 0xED && b2 === 0xFA && (b3 === 0xCE || b3 === 0xCF)) ||
      (b0 === 0xCE && b1 === 0xFA && b2 === 0xED && b3 === 0xFE) ||
      (b0 === 0xCF && b1 === 0xFA && b2 === 0xED && b3 === 0xFE) ||
      (b0 === 0xCA && b1 === 0xFE && b2 === 0xBA && b3 === 0xBE); // Java bytecode or FAT Mach-O

    if (isMachO) {
      return {
        isMalware: true,
        reason: 'محظور أمنياً: تم اكتشاف ملف تشغيلي تنفيذي (Mach-O / Java Class executable signature detected).'
      };
    }
  }

  // 4. Shell script hashbang (#! = 0x23, 0x21)
  if (bytes[0] === 0x23 && bytes[1] === 0x21) {
    return {
      isMalware: true,
      reason: 'محظور أمنياً: تم اكتشاف سكربت تنفيذي يبدأ بـ Shebang (Executable script header detected).'
    };
  }

  // 5. Deep content inspection for web shells, polyglots, and embedded exploits
  try {
    const decoder = new TextDecoder('utf-8', { fatal: false });
    let textToInspect = decoder.decode(bytes).toLowerCase();

    // If file is larger than 64KB, also scan tail 8KB to detect appended payloads
    if (buffer.byteLength > 65536) {
      const tailBytes = new Uint8Array(buffer.slice(buffer.byteLength - 8192));
      textToInspect += ' ' + decoder.decode(tailBytes).toLowerCase();
    }

    const dangerousPatterns = [
      '<?php',
      '<?=',
      '<script',
      '<iframe',
      '<object',
      '<embed',
      'eval(base64_decode',
      'eval(gzinflate',
      'eval($_',
      'passthru(',
      'shell_exec(',
      'system($_',
      'powershell',
      'cmd.exe',
      '/bin/sh',
      '/bin/bash'
    ];

    for (const pattern of dangerousPatterns) {
      if (textToInspect.includes(pattern)) {
        return {
          isMalware: true,
          reason: `محظور أمنياً: تم رصد شفرة برمجية خبيثة داخل محتوى الملف (${pattern}).`
        };
      }
    }
  } catch (e) {}

  return { isMalware: false };
}
