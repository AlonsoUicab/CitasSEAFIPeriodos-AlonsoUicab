<template>
    <div class="auth-page-wrapper pt-5">
        <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div class="bg-overlay"></div>
            <div class="shape">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                     viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
        </div>
        <div class="auth-page-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center mt-sm-5 mb-4 text-white-50">
                            <div>
                                <div class="d-inline-block auth-logo">
                                    <img src="@/assets/images/layouts/logos/gob-hz-light.svg" alt="" height="75">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <router-view></router-view>
            </div>
        </div>
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center">
                            <a style="font-size:12px" href="mailto:soporteSEMAIG@campeche.gob.mx" class="text-pantone-gray"><b>REPORTAR UN PROBLEMA</b></a><br>
                            <span class="text-muted">&copy; {{ new Date().getFullYear() }} SEMAIG</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>
