const uniqueSubjects = (questions, getCount = false) => {
    const allSubjects = new Set();
    for (let i = 0; i < questions.length; i++) {
        const subject = questions[i].subject?.trim().toLowerCase(); 
        if (subject) {
            allSubjects.add(subject);
        }
    }
    if (getCount) {
        return allSubjects.size;
    } else {
        return [...allSubjects];
    }
};

export { uniqueSubjects };
