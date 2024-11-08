async function getStudents() {
    opiskelijat = await fetch('opiskelijat/opiskelijat.json')
    opiskelijat = await opiskelijat.json()
    console.log('students', opiskelijat)
}
getStudents()