<script>
    import { useUserStore } from '../stores/userStore'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'

    export default {
        setup() {
            const userStore = useUserStore()
            const router = useRouter()
            const loginData = ref({
                username: '',
                password: ''
            })

            const login = async () => {
                try {
                    const response = await fetch('http://localhost:8000/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: loginData.value.email,
                            password: loginData.value.password
                        })
                    })
                    
                    if (!response.ok) {
                        throw new Error('Credenciais inválidas')
                    }

                    const data = await response.json()

                    userStore.setUser(data.data)
                    router.push('/')
                } catch (error) {
                    console.error('Erro ao fazer login:', error)
                }
            }

            return {
                loginData,
                login
            }
        }
    }

</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card mt-5">
            <div class="card-body">
                <h3 class="card-title text-center">Login</h3>
                <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="emailInput" class="form-label">Email</label>
                    <input v-model="loginData.email" type="email" class="form-control" id="emailInput" placeholder="Digite seu email">
                </div>
                <div class="mb-3">
                    <label for="passwordInput" class="form-label">Senha</label>
                    <input v-model="loginData.password" type="password" class="form-control" id="passwordInput" placeholder="Digite sua senha">
                </div>
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">Logar</button>
                </div>
                </form>
                <div class="mt-3 text-center">
                    <router-link to="/register">Criar conta</router-link>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>

</style>