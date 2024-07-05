<script>
    import { ref } from 'vue'
    import { useUserStore } from '../stores/userStore'

    export default {
    setup() {
        const userStore = useUserStore()

        const formData = ref({
            name: '',
            start_date: '',
            end_date: '',
            value: '',
            status: 'A'
        })

        const createProject = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/projects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer '+userStore.user.token
                    },
                    body: JSON.stringify({
                        name: formData.value.name,
                        start_date: formData.value.start_date,
                        end_date: formData.value.end_date,
                        value: formData.value.value,
                        status: formData.value.status,
                    })
                })
                console.log(formData.value);

                console.log(response);
                
                if (!response.ok) {
                    throw new Error('Algo deu errado na requisição')
                }

                const data = await response.json()

                userStore.setUser(data.data)
                router.push('/')
            } catch (error) {
                console.error('Erro ao criar projeto:', error)
            }
        }

        return {
        formData,
        createProject
        }
    }
    }
</script>

<template>
    <div>

        <button type="button" class="floating-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
        +
        </button>
        
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="projectModalLabel">Criar Projeto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="createProject">
                            <div class="mb-3">
                                <label for="projectName" class="form-label">Nome do Projeto</label>
                                <input  type="text" class="form-control" id="projectName" v-model="formData.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="startDate" class="form-label">Data de Inicio</label>
                                <input type="date" class="form-control" id="startDate" v-model="formData.start_date" required>
                            </div>
                            <div class="mb-3">
                                <label for="endDate" class="form-label">Data de Término</label>
                                <input type="date" class="form-control" id="endDate" v-model="formData.end_date" required>
                            </div>
                            <div class="mb-3">
                                <label for="projectValue" class="form-label">Valor</label>
                                <input type="number" class="form-control" id="projectValue" v-model="formData.value" required>
                            </div>
                            <div class="mb-3">
                                <label for="projectStatus" class="form-label">Status</label>
                                <select class="form-control" id="projectStatus" v-model="formData.status" required>
                                    <option value="A">Ativo</option>
                                    <option value="I">Inativo</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Criar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            
    </div>








  </template>

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  border-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
</style>