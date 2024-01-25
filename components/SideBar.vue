<template>
    <div class="sidebar">
        <div class="groupbox">
            <div :class="{ 'containerH3Selecionado': step === 1, 'containerH3': step !== 1 }">
                <h3>1</h3>
            </div>
            <div class="groupText">
                <span>STEP 1</span>
                <p> Dados Pessoais</p>
            </div>
        </div>
        <div class="groupbox">
            <div :class="{ 'containerH3Selecionado': step === 2, 'containerH3': step !== 2 }">
                <h3>2</h3>
            </div>
            <div class="groupText">
                <span>STEP 2</span>
                <p>Informações Adicionais</p>
            </div>
        </div>
        <div class="groupbox">
            <div :class="{ 'containerH3Selecionado': step === 3, 'containerH3': step !== 3 }">
                <h3>3</h3>
            </div>
            <div class="groupText">
                <span>STEP 3</span>
                <p>Envio de Documentos</p>
            </div>
        </div>
        <div class="groupbox">
            <div :class="{ 'containerH3Selecionado': step === 4, 'containerH3': step !== 4 }">
                <h3>4</h3>
            </div>
            <div class="groupText">
                <span>STEP 4</span>
                <p>Confirmação e Envio</p>
            </div>
        </div>

    </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters("step", ['step']),
    },
}
</script>

<style lang="css" scoped>
.sidebar {
    width: 30%;
    height: 100%;
    background-color: var(--color-primary);
    background-size: cover;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 2.2rem;
    gap: 1rem;
    flex-grow: 0;
}

.groupbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.containerH3 {

    width: 35px;
    height: 35px;
    border: 1px solid var(--color-primary-hover);
    border-radius: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--branco);

}

.containerH3 h3 {
    margin: 0;
}

.containerH3Selecionado {
    width: 35px;
    height: 35px;
    border: 1px solid var(--color-primary-hover);
    border-radius: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary-hover);
    color: var(--branco);
    transform: scale(1.2);
}

.containerH3Selecionado h3 {
    margin: 0;
}

.groupText {
    min-width: 60%;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.groupText span {

    font-weight: 500;
    color: var(--color-background-primary);
    font-size: 12px;
}

.groupText p {
    font-weight: 700;
    font-family: 'Ubuntu';
    margin: 0;
    color: var(--branco);
}

@media screen and (max-width:700px) {

    .sidebar {
        width: 100%;
        padding: 3rem;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }



    .groupbox {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;


    }

    .containerH3 {
        width: 50px;
        height: 50px;
        border-radius: 5rem;
    }

    .containerH3Selecionado {
        background-color: var(--color-primary-hover);
    }

    .groupText {

        display: none;

    }

    .groupText span {

        font-weight: 500;
        color: var(--color-background-primary);
        font-size: 12px;
    }

    .groupText p {
        font-weight: 700;
        font-family: 'Ubuntu';
        margin: 0;
        color: var(--branco);
    }

}
</style>
