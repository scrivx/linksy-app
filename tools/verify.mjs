#!/usr/bin/env node

/**
 * Verificador de Integración - Linksy
 * Ejecuta: node tools/verify.mjs
 *
 * Este script verifica que la API y la web están correctamente configuradas
 */

const API_URL = 'http://localhost:3000';

console.log('🔍 Verificando integración de Linksy...\n');

// Test 1: API disponible
console.log('1️⃣  Verificando disponibilidad de la API...');
try {
  const response = await fetch(`${API_URL}/`);
  const data = await response.json();
  console.log('   ✅ API disponible en', API_URL);
  console.log('   Respuesta:', data.message || data);
} catch (error) {
  console.log(
    '   ❌ API no disponible. Asegúrate que está corriendo en',
    API_URL,
  );
  console.log('   Error:', error.message);
}

// Test 2: CORS configurado
console.log('\n2️⃣  Verificando configuración de CORS...');
try {
  const response = await fetch(`${API_URL}/`, {
    method: 'OPTIONS',
    headers: {
      Origin: 'http://localhost:4321',
      'Access-Control-Request-Method': 'POST',
    },
  });
  if (response.status === 200) {
    console.log('   ✅ CORS configurado correctamente');
  }
} catch (error) {
  console.log('   ⚠️  No se pudo verificar CORS');
}

// Test 3: Crear link de prueba
console.log('\n3️⃣  Intentando crear un link de prueba...');
try {
  const response = await fetch(`${API_URL}/api/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: 'https://ejemplo.com',
      alias: `test-${Date.now()}`,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('   ✅ Link creado exitosamente');
    console.log('   URL corta:', data.shortUrl);
  } else {
    const error = await response.json();
    console.log('   ❌ Error al crear link:', error.error);
  }
} catch (error) {
  console.log('   ❌ Error en la conexión:', error.message);
}

console.log('\n✨ Verificación completada!\n');
