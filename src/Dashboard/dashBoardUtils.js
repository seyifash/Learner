const uniqueSubjects = (questions, getCount = false) => {
    const allSubjects = [];
    for (let i = 0; i < questions.length; i++) {
        const subject = questions[i].subject;
        if (subject && !allSubjects.includes(subject)) {
            allSubjects.push(subject);
        }
    }
    if (getCount) {
        return allSubjects.length;
    } else {
        return allSubjects;
    }
};

export { uniqueSubjects };
