export default async function getQuizByCourse(id, axiosPrivate) {
    let quiz;

    const response = await axiosPrivate.get(`/api/learners/v1/all-questions/${id}`)
    if (response.status === 200) {
        quiz = response.data;
        console.log(quiz)
        const subjects = [];
        quiz.forEach(items => {
            if (items.subject && !subjects.includes(items.subject)) {
                subjects.push(items.subject);
            }
        });
        return subjects;
    } else {
        console.error('Error fetching questions:', response.status);
        return [];
    }
}