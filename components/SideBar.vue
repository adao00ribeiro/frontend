<template>
    <div class="container">
        <div class="group">
            <div class="groupbox">
                <div class="containerH3">
                    <h3>1</h3>
                </div>
                <div class="groupText">
                    <span>STEP 1</span>
                    <p> Dados Pessoais</p>
                </div>
            </div>
            <div class="groupbox">
                <div class="containerH3">
                    <h3>2</h3>
                </div>
                <div class="groupText">
                    <span>STEP 2</span>
                    <p>Informações Adicionais</p>
                </div>
            </div>
            <div class="groupbox">
                <div class=" containerH3">
                    <h3>3</h3>

                </div>
                <div class="groupText">
                    <span>STEP 3</span>
                    <p>Envio de Documentos</p>
                </div>
            </div>
            <div class="groupbox">
                <div class="containerH3">
                    <h3>4</h3>
                </div>
                <div class="groupText">
                    <span>STEP 4</span>
                    <p>Confirmação e Envio</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
.container {
    width: 100%;
    height: 100%;
    background-color: blue;
    background-size: cover;
    border-radius: 5px;
    display: flex;
    flex-direction: column;

}

.group {
    margin-top: 2.2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.groupbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;

}

.containerH3 {
    max-width: 30%;
    width: 35px;
    height: 35px;
    border: 1px solid var(--Light-blue);
    border-radius: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--branco);
}

.containerH3Selecionado {
    background-color: var(--Light-blue);
}

.groupText {
    min-width: 60%;
    display: flex;
    flex-direction: column;
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
</style>