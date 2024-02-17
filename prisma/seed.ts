import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    // 1 //
    // Seed Quiz1
    const quiz1 = await prisma.quiz.create({
        data: {
            code: 'Q1',
            title: 'Capital Cities Quiz',
            shortDescription: 'Test your knowledge of world capitals.',
            createdBy: 'admin'
        },
    });

    // Question 1 for Quiz 1
    const question1_1 = await prisma.question.create({
        data: {
            code: 'Q1-1',
            text: 'What is the capital of France?',
            hint: 'Think about famous landmarks.',
            quizId: quiz1.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'Q1-1-O1',
                text: 'Berlin',
                questionId: question1_1.id,
                createdBy: 'admin',
            },
            {
                code: 'Q1-1-O2',
                text: 'Paris',
                questionId: question1_1.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'Q1-1-O3',
                text: 'London',
                questionId: question1_1.id,
                createdBy: 'admin',
            },
            {
                code: 'Q1-1-O4',
                text: 'Madrid',
                questionId: question1_1.id,
                createdBy: 'admin',
            },
        ],
    });

    // Question 2 for Quiz 1
    const question1_2 = await prisma.question.create({
        data: {
            code: 'Q1-2',
            text: 'What is the capital of Spain?',
            hint: 'Think about a European country known for its rich history, culture, and flamenco dancing. The capital city is a major cultural and economic center, hosting world-renowned museums and landmarks.',
            quizId: quiz1.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'Q1-2-O1',
                text: 'Madrid',
                questionId: question1_2.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'Q1-2-O2',
                text: 'Barcelona',
                questionId: question1_2.id,
                createdBy: 'admin',
            },
            {
                code: 'Q1-2-O3',
                text: 'Seville',
                questionId: question1_2.id,
                createdBy: 'admin',
            },
            {
                code: 'Q1-2-O4',
                text: 'Paris',
                questionId: question1_2.id,
                createdBy: 'admin',
            },
        ],
    });

    // Question 3 for Quiz 1
    const question1_3 = await prisma.question.create({
        data: {
            code: 'Q1-3',
            text: 'What is the capital of India?',
            hint: 'Consider a city with a prominent historical significance, known for its diverse culture, iconic landmarks such as the Red Fort and India Gate, and as the seat of the country\'s government.',
            quizId: quiz1.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'Q1-3-O1',
                text: 'New Delhi',
                questionId: question1_3.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'Q1-3-O2',
                text: 'Mumbai',
                questionId: question1_3.id,
                createdBy: 'admin',
            },
            {
                code: 'Q1-3-O3',
                text: 'Kolkata',
                questionId: question1_3.id,
                createdBy: 'admin',
            },
            {
                code: 'Q1-3-O4',
                text: 'Rome',
                questionId: question1_3.id,
                createdBy: 'admin',
            },
        ],
    });


    // 2 //
    // Create General Knowledge Quiz
    const generalKnowledgeQuiz = await prisma.quiz.create({
        data: {
            code: 'GK-1',
            title: 'General Knowledge',
            shortDescription: 'Test your general knowledge with this quiz!',
            createdBy: 'admin',
        },
    });


    const developQuestion = await prisma.question.create({
        data: {
            code: 'DEV-1-Q1',
            text: 'Which programming languages are commonly used for web development?',
            hint: 'The movie "Titanic" was released on December 19, 1997, in the United States. Directed by James Cameron, the film became a massive critical and commercial success, earning numerous awards, including 11 Academy Awards.',
            quizId: generalKnowledgeQuiz.id,
            maxOptionCanSelected: 2,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'DEV-1-Q1-O1',
                text: 'Java',
                questionId: developQuestion.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'DEV-1-Q1-O2',
                text: 'English',
                questionId: developQuestion.id,
                createdBy: 'admin',
            },
            {
                code: 'DEV-1-Q1-O3',
                text: 'Vietnamese',
                questionId: developQuestion.id,
                createdBy: 'admin',
            },
            {
                code: 'DEV-1-Q1-O4',
                text: 'Python',
                questionId: developQuestion.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
        ],
    });
    // Create Question for the General Knowledge Quiz
    const generalKnowledgeQuestion = await prisma.question.create({
        data: {
            code: 'GK-1-Q1',
            text: 'Who wrote the book "Chitty-Chitty-Bang-Bang: The Magical Car"?',
            hint: 'The book "Chitty-Chitty-Bang-Bang: The Magical Car" was written by Ian Fleming, best known for creating the character James Bond. The book was published posthumously in 1964, after Fleming\'s death in 1964.',
            quizId: generalKnowledgeQuiz.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'GK-1-Q1-O1',
                text: 'Roald Dahl',
                questionId: generalKnowledgeQuestion.id,
                createdBy: 'admin',
            },
            {
                code: 'GK-1-Q1-O2',
                text: 'Enid Blyton',
                questionId: generalKnowledgeQuestion.id,
                createdBy: 'admin',
            },
            {
                code: 'GK-1-Q1-O3',
                text: 'Ian Fleming',
                questionId: generalKnowledgeQuestion.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'GK-1-Q1-O4',
                text: 'J.K. Rowling',
                questionId: generalKnowledgeQuestion.id,
                createdBy: 'admin',
            },
        ],
    });

    // Create Question for the General Knowledge Quiz
    const generalKnowledgeQuestion2 = await prisma.question.create({
        data: {
            code: 'GK-2-Q1',
            text: 'In which part of your body would you find the cruciate ligament?',
            hint: 'The cruciate ligaments are found in the knee joint. There are two cruciate ligaments in the knee: the anterior cruciate ligament (ACL) and the posterior cruciate ligament (PCL). These ligaments play a crucial role in stabilizing the knee joint and controlling its movements.',
            quizId: generalKnowledgeQuiz.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'GK-2-Q1-O1',
                text: 'Knee',
                questionId: generalKnowledgeQuestion2.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'GK-2-Q1-O2',
                text: 'Elbow',
                questionId: generalKnowledgeQuestion2.id,
                createdBy: 'admin',
            },
            {
                code: 'GK-2-Q1-O3',
                text: 'Ankle',
                questionId: generalKnowledgeQuestion2.id,
                createdBy: 'admin',
            },
            {
                code: 'GK-2-Q1-O4',
                text: 'Wrist',
                questionId: generalKnowledgeQuestion2.id,
                createdBy: 'admin',
            },
        ],
    });

    // Create Question for the Literature Question
    const literatureQuestion = await prisma.question.create({
        data: {
            code: 'LIT-1-Q1',
            text: 'What is the name of the main antagonist in the Shakespeare play Othello?',
            hint: 'In the Shakespeare play "Othello," the main antagonist is Iago. Iago is a cunning and manipulative character who orchestrates a series of deceptions and schemes to manipulate Othello, the play\'s protagonist, and others, leading to tragic consequences.',
            quizId: generalKnowledgeQuiz.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'LIT-1-Q1-O1',
                text: 'Iago',
                questionId: literatureQuestion.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'LIT-1-Q1-O2',
                text: 'Macbeth',
                questionId: literatureQuestion.id,
                createdBy: 'admin',
            },
            {
                code: 'LIT-1-Q1-O3',
                text: 'Hamlet',
                questionId: literatureQuestion.id,
                createdBy: 'admin',
            },
            {
                code: 'LIT-1-Q1-O4',
                text: 'Romeo',
                questionId: literatureQuestion.id,
                createdBy: 'admin',
            },
        ],
    });

    // Create Question for the Movie Quiz
    const movieQuestion = await prisma.question.create({
        data: {
            code: 'MOV-1-Q1',
            text: 'When was the movie Titanic released?',
            hint: 'The movie "Titanic" was released on December 19, 1997, in the United States. Directed by James Cameron, the film became a massive critical and commercial success, earning numerous awards, including 11 Academy Awards.',
            quizId: generalKnowledgeQuiz.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'MOV-1-Q1-O1',
                text: '1997',
                questionId: movieQuestion.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'MOV-1-Q1-O2',
                text: '2001',
                questionId: movieQuestion.id,
                createdBy: 'admin',
            },
            {
                code: 'MOV-1-Q1-O3',
                text: '1995',
                questionId: movieQuestion.id,
                createdBy: 'admin',
            },
            {
                code: 'MOV-1-Q1-O4',
                text: '2005',
                questionId: movieQuestion.id,
                createdBy: 'admin',
            },
        ],
    });


    // 3 //
    // Create Geography Quiz
    const geographyQuiz = await prisma.quiz.create({
        data: {
            code: 'GEO-1',
            title: 'Geography',
            shortDescription: 'Explore your knowledge of geography!',
            createdBy: 'admin',
        },
    });
    // Create Question for the Geography Quiz
    const geographyQuestion = await prisma.question.create({
        data: {
            code: 'GEO-1-Q1',
            text: 'What is the currency of Denmark?',
            hint: 'The currency of Denmark is the Danish Krone, abbreviated as DKK.',
            quizId: geographyQuiz.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'GEO-1-Q1-O1',
                text: 'Danish Krone',
                questionId: geographyQuestion.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'GEO-1-Q1-O2',
                text: 'Euro',
                questionId: geographyQuestion.id,
                createdBy: 'admin',
            },
            {
                code: 'GEO-1-Q1-O3',
                text: 'Swedish Krona',
                questionId: geographyQuestion.id,
                createdBy: 'admin',
            },
            {
                code: 'GEO-1-Q1-O4',
                text: 'Pound Sterling',
                questionId: geographyQuestion.id,
                createdBy: 'admin',
            },
        ],
    });

    // Create Question for the Geography Quiz
    const geographyQuestion2 = await prisma.question.create({
        data: {
            code: 'GEO-2-Q1',
            text: 'What is the currency of South Korea?',
            hint: 'The currency of South Korea is the South Korean Won, abbreviated as KRW.',
            quizId: geographyQuiz.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'GEO-2-Q1-O1',
                text: 'Won',
                questionId: geographyQuestion2.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'GEO-2-Q1-O2',
                text: 'Yen',
                questionId: geographyQuestion2.id,
                createdBy: 'admin',
            },
            {
                code: 'GEO-2-Q1-O3',
                text: 'Ringgit',
                questionId: geographyQuestion2.id,
                createdBy: 'admin',
            },
            {
                code: 'GEO-2-Q1-O4',
                text: 'Baht',
                questionId: geographyQuestion2.id,
                createdBy: 'admin',
            },
        ],
    });

    // Create Question for the Geography Quiz
    const geographyQuestion3 = await prisma.question.create({
        data: {
            code: 'GEO-3-Q1',
            text: 'What is the currency of Vietnam?',
            hint: 'The currency of Vietnam is the Vietnamese Dong, abbreviated as VND.',
            quizId: geographyQuiz.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'GEO-3-Q1-O1',
                text: 'Dong',
                questionId: geographyQuestion3.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'GEO-3-Q1-O2',
                text: 'Ringgit',
                questionId: geographyQuestion3.id,
                createdBy: 'admin',
            },
            {
                code: 'GEO-3-Q1-O3',
                text: 'Baht',
                questionId: geographyQuestion3.id,
                createdBy: 'admin',
            },
            {
                code: 'GEO-3-Q1-O4',
                text: 'Yen',
                questionId: geographyQuestion3.id,
                createdBy: 'admin',
            },
        ],
    });


    // Create Question for the Geography Quiz
    const geographyQuestion4 = await prisma.question.create({
        data: {
            code: 'GEO-4-Q1',
            text: 'What is the currency of the United States?',
            hint: 'The currency of the United States is the United States Dollar, abbreviated as USD.',
            quizId: geographyQuiz.id,
            createdBy: 'admin',
        },
    });
    await prisma.option.createMany({
        data: [
            {
                code: 'GEO-4-Q1-O1',
                text: 'Dollar',
                questionId: geographyQuestion4.id,
                createdBy: 'admin',
                match: true, // Correct answer
            },
            {
                code: 'GEO-4-Q1-O2',
                text: 'Euro',
                questionId: geographyQuestion4.id,
                createdBy: 'admin',
            },
            {
                code: 'GEO-4-Q1-O3',
                text: 'Pound',
                questionId: geographyQuestion4.id,
                createdBy: 'admin',
            },
            {
                code: 'GEO-4-Q1-O4',
                text: 'Yen',
                questionId: geographyQuestion4.id,
                createdBy: 'admin',
            },
        ],
    });






    console.log('Seed completed successfully.');
}

seed()
    .catch((error) => {
        throw error;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
