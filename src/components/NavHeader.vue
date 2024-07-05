<script>
    import { useUserStore } from '../stores/userStore'
    import { useRouter } from 'vue-router'

    export default {
    setup() {
        const userStore = useUserStore()
        const router = useRouter()

        const logout = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userStore.user.token
                    }
                })
                
                if (!response.ok) {
                    throw new Error('Erro na requisição')
                }

                const data = await response.json()

                userStore.clearUser()
                
                router.push('/login')
            } catch (error) {
              console.error('Erro ao deslogar:', error)
            }
        }

        return {
            user: userStore.user,
            isLoggedIn: userStore.isLoggedIn,
            logout
        }
    }
    }
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Home</router-link>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <div v-if="isLoggedIn">
                            <a href="#" @click.prevent="logout">Bem-vindo, {{ user.name }}</a>
                        </div>
                        <div v-else>
                            <router-link to="/login">Login</router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .container-fluid {
        display: flex;
        justify-content: space-between;
    }
</style>