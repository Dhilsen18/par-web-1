<!--
  app-toolbar.vue
  @summary Application toolbar with logo, navigation links and language switcher.
  @author Student Developer
-->
<template>
  <header class="app-header" role="banner">
    <div class="app-header-inner">
      <div class="toolbar-brand" role="img" :aria-label="$t('app.title')">
        <img
          :src="logoUrl"
          alt="Merck logo"
          class="brand-logo"
          @error="handleLogoError"
        />
        <span class="brand-title">{{ $t('app.title') }}</span>
      </div>

      <nav class="toolbar-nav" aria-label="Main menu">
        <router-link to="/home" class="nav-link" :aria-label="$t('nav.home')">
          {{ $t('nav.home') }}
        </router-link>
        <router-link to="/support/issues/new" class="nav-link" :aria-label="$t('nav.new_issue')">
          {{ $t('nav.new_issue') }}
        </router-link>
      </nav>

      <div class="language-switcher" role="group" aria-label="Language selector">
        <pv-button
          :label="$t('language.en')"
          :class="['lang-btn', { active: locale === 'en' }]"
          size="small"
          text
          :aria-pressed="locale === 'en'"
          @click="switchLanguage('en')"
        />
        <pv-button
          :label="$t('language.es')"
          :class="['lang-btn', { active: locale === 'es' }]"
          size="small"
          text
          :aria-pressed="locale === 'es'"
          @click="switchLanguage('es')"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'

const PvButton = Button

const { locale } = useI18n()
const logoUrl = import.meta.env.VITE_CLEARBIT_LOGO_URL

function switchLanguage(lang) {
  locale.value = lang
}

function handleLogoError(event) {
  event.target.style.display = 'none'
}
</script>

<style scoped>
.app-header {
  background: #00857c;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.app-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.toolbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.brand-logo {
  height: 32px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.brand-title {
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.3;
}

.toolbar-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  white-space: nowrap;
  transition: background 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

.language-switcher {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: auto;
}

.lang-btn {
  color: #fff !important;
  min-width: 2.5rem;
}

.lang-btn.active {
  background: rgba(255, 255, 255, 0.25) !important;
}

@media (max-width: 768px) {
  .app-header-inner {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }

  .brand-title {
    font-size: 0.9rem;
  }

  .toolbar-nav {
    order: 3;
    width: 100%;
    flex: none;
  }

  .language-switcher {
    margin-left: 0;
  }
}
</style>
