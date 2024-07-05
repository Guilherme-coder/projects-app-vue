<script>
    import { useUserStore } from '../stores/userStore'
    import { ref, onMounted } from 'vue'
    import FormProjects from './FormProjects.vue'
    
    export default {
        setup() {
          const projects = ref([])
          const userStore = useUserStore()
          const page = 1
          
          const fetchProjects = async () => {
            try {
              const response = await fetch('http://localhost:8000/api/projects?page=1', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+userStore.user.token
                  }
              })
              
              if (!response.ok) {
                throw new Error('Erro na requisição')
              }

              const data = await response.json()

              projects.value = data.data
            } catch (error) {
              console.error('Erro ao buscar projetos:', error)
            }
          }

          onMounted(fetchProjects)

          return {
            projects
          }
        },
        components: {
          FormProjects
        }

        
      }
</script>

<template>
  <div>
    <FormProjects/>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Data início</th>
            <th scope="col">Data fim</th>
            <th scope="col">Valor</th>
            <th scope="col">Status</th>
            <th scope="col">Criador</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.id }}</td>
            <td>{{ project.name }}</td>
            <td>{{ project.start_date }}</td>
            <td>{{ project.end_date }}</td>
            <td>{{ project.value }}</td>
            <td>{{ project.status }}</td>
            <td>{{ project.creator }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
</template>

<style scoped>
  .container {
    width: 80%;
  }

</style>