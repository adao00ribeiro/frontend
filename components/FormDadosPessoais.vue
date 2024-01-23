<template>
    <div class="w-100 h-100 d-flex flex-column">
        <h3>Dados Pessoais</h3>
        <form class="flex-grow-1">
            <div class="form-group">
                <label for="exampleInputEmail1">Nome</label>
                <input type="Nome" class="form-control" id="name" aria-describedby="emailHelp" placeholder="e.g sthepen">

            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Email</label>
                <input type="email" class="form-control" id="email" placeholder="sthepen@gmail.com">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Telefone</label>
                <input type="password" class="form-control" id="telefone" placeholder="999009922">
            </div>

        </form>
        <button type="submit" class="btn btn-primary mt-auto align-self-end">Submit</button>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped></style>