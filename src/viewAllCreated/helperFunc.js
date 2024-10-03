export default function getQuizByCourse(id) {
    let quiz;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://Osei.pythonanywhere.com/api/learners/v1/all-questions/${id}`, false);
    xhr.send();

    if (xhr.status === 200) {
        quiz = JSON.parse(xhr.responseText);
        const subjects = [];
        quiz.forEach(items => {
            if (items.subject && !subjects.includes(items.subject)) {
                subjects.push(items.subject);
            }
        });
        return subjects;
    } else {
        console.error('Error fetching questions:', xhr.statusText);
        return [];
    }
}