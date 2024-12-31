document.addEventListener('DOMContentLoaded', () => {
    const schoolType = document.getElementById('school-type');
    schoolType.addEventListener('change', updateSchoolGrades);

    function updateSchoolGrades() {
        const schoolTypeValue = schoolType.value;
        const schoolGrade = document.getElementById('school-grade');

        // Clear existing options
        schoolGrade.innerHTML = '<option value="">Select School Grade</option>';

        if (schoolTypeValue === 'SK' || schoolTypeValue === 'SJKC') {
            // Populate Year 1 to Year 6
            for (let i = 1; i <= 6; i++) {
                const option = document.createElement('option');
                option.value = `year${i}`;
                option.text = `Year ${i}`;
                schoolGrade.add(option);
            }
        } else if (schoolTypeValue === 'SMK') {
            // Populate Form 1 to Form 5
            for (let i = 1; i <= 5; i++) {
                const option = document.createElement('option');
                option.value = `form${i}`;
                option.text = `Form ${i}`;
                schoolGrade.add(option);
            }
        }
    }
});
