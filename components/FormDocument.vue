<template>
    <div class="w-100 h-100 d-flex flex-column">
        <h3>Informaçôes Adicionais</h3>
        <form class="flex-grow-1">
            <label className={styles.labelAvatar}>
                <span>
                    <FiUpload size={30} color="#FFF" />
                </span>
                <input type="file" name='inputFile' accept="image/png, image/jpeg" onChange={handleFile} />

                <img className={styles.preview} src="" alt="Documento" width={250} height={250} />
                <img className={styles.preview} src="" alt="Documento" width={250} height={250} />
            </label>
        </form>
        <button type="submit" class="btn btn-primary mt-auto align-self-end">Submit</button>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped></style>