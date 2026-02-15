#!/usr/bin/env bun
import { $ } from 'bun'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Read app configuration
const configPath = './app-config.json'
let config: any

try {
  config = JSON.parse(readFileSync(configPath, 'utf-8'))
} catch (error) {
  console.error('❌ Error reading app-config.json')
  console.error('Please create app-config.json with your app configuration')
  process.exit(1)
}

console.log('📱 Building Android App with configuration:')
console.log(`   App Name: ${config.appName}`)
console.log(`   Package ID: ${config.packageId}`)
console.log(`   App URL: ${config.appUrl}`)
console.log(`   Allowed Domains: ${config.allowedDomains.join(', ')}`)

// Initialize submodule if needed
console.log('\n📦 Initializing WebApkShell submodule...')
try {
  await $`git submodule deinit -f WebApkShell`.quiet()
} catch (e) {
  // Ignore error if not initialized
}

await $`git submodule update --init --remote WebApkShell`

// Apply the template patch with replacements
console.log('\n🔧 Configuring WebView with your settings...')
const patchTemplate = readFileSync('./webapkshell-template.patch', 'utf-8')

// Replace placeholders
const allowedDomainsStr = config.allowedDomains.map((d: string) => `"${d}"`).join(', ')
let patchContent = patchTemplate
  .replace('__ALLOWED_DOMAINS__', allowedDomainsStr)
  .replace('__APP_URL__', config.appUrl)

// Write the customized patch
const customPatch = './webapkshell-custom.patch'
writeFileSync(customPatch, patchContent)

// Apply the patch
try {
  await $`cd WebApkShell && git apply --check ../${customPatch}`.quiet()
  await $`cd WebApkShell && git apply ../${customPatch}`
  console.log('✅ WebView configuration applied')
} catch (error) {
  console.error('⚠️  Could not apply patch - WebApkShell might already be configured')
}

// Create minimal dist directory
console.log('\n📁 Creating asset directory...')
await $`mkdir -p ./packages/vant/site-dist`
writeFileSync(
  './packages/vant/site-dist/index.html',
  '<!DOCTYPE html><html><body>Loading...</body></html>'
)

// Build the APK
console.log('\n🔨 Building APK...')
const env = {
  AP_ID: config.packageId,
  AP_NAME: config.appName,
  AP_VERSION_CODE: Math.floor(Date.now() / 1000).toString(),
  AP_VERSION_NAME: config.versionName || getVersionName(),
  AP_ICON: 'logo',
}

console.log('   Environment variables:', env)

await $`cd WebApkShell && ./gradlew assembleRelease`.env({
  ...process.env,
  ...env,
})

console.log('\n✅ Build complete!')
console.log(`   APK location: WebApkShell/app/build/outputs/apk/release/`)

function getVersionName() {
  const date = new Date()
  const dateStr = date
    .toLocaleDateString()
    .split('/')
    .map((it) => it.padStart(2, '0'))
    .sort((b, a) => a.length - b.length)
    .join('')
  const timeArr = date
    .toString()
    .split(' ')[4]
    .split(':')
    .map((it) => it.padStart(2, '0'))
  timeArr[2] = timeArr[2]
    .split('')
    .map((n) => (+n + 10).toString(36))
    .join('')
    .toUpperCase()
  return [dateStr, timeArr.join('')].join('T')
}
