<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HamburgerMenu from './components/icons/HamburgerMenu.vue'
import NavigationLinks from './components/NavigationLinks.vue'
</script>

<template>
    <div class="drawer">
        <input id="nav-drawer" type="checkbox" class="drawer-toggle" />

        <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <div class="w-full navbar bg-base-300">
                <div class="flex-none lg:hidden">
                    <label for="nav-drawer" class="btn btn-square btn-ghost">
                        <HamburgerMenu />
                    </label>
                </div>

                <div class="flex-1 px-2 mx-2">
                    <RouterLink to="/" class="flex">
                        <img src="@/assets/logo.svg" width="25"/>ocals
                    </RouterLink>
                </div>
                
                <div class="flex-none hidden lg:block">
                    <ul class="menu menu-horizontal">
                        <NavigationLinks />
                    </ul>
                </div>
            </div>

            <!-- Page content here -->
            <RouterView />
        </div>

        <div class="drawer-side">
            <label for="nav-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 bg-base-100">
                <NavigationLinks />
            </ul>
        </div>
    </div>
</template>
