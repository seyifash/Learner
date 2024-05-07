export default function getQuestionsBySubject(questions, subject=null) {
    if(subject === null) {
        const allSubjects = questions.map(question => question.subject);
        return [...new Set(allSubjects)];
    } else {
        return questions.filter(question => question.subject === subject);
    }
}