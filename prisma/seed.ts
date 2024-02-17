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

    // Create Question for the General Knowledge Quiz
    const generalKnowledgeQuestion = await prisma.question.create({
        data: {
            code: 'GK-1-Q1',
            text: 'Who wrote the book "Chitty-Chitty-Bang-Bang: The Magical Car"?',
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
            quizId: generalKnowledgeQuiz.id,
            createdBy: 'admin',
        },
    });

    // Create Options for the Movie Question
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
