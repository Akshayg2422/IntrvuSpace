import { Button, CommonTable, Divider, NoRecordsFound, Spinner } from '@Components';
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Progress } from 'reactstrap'
import ReactToPrint from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasicReport } from '@Redux';
import { useLoader } from '@Hooks';
import moment from 'moment';
import { useLinkClickHandler } from 'react-router-dom';

function Report() {


    const dispatch = useDispatch()
    const { scheduleId } = useSelector((state: any) => state.DashboardReducer)
    const [dataId, setDataId] = useState<any>(['trait', 'communication', 'skill_matrix'])
    const [basicReportData, setBasicReportData] = useState<any>(

        {
            "name": "Tamil Selvan",
            "sub_text": "React Native - 2 years of experience",
            "sub_text2": "Interview Conducted at 2023-08-03 15:00:03.948453+00:00 - Report generated at - 2023-08-04 12:55:27.919728",
            "trait": [
                {
                    "trait": "Positive Attitude",
                    "percent": 80,
                    "trait_type": "Positive",
                    "trait_status": "High",
                    "reason": "The interviewee demonstrates a positive attitude by providing clear and concise explanations to the questions asked."
                },
                {
                    "trait": "Teamwork",
                    "percent": 60,
                    "trait_type": "Positive",
                    "trait_status": "Medium",
                    "reason": "The interviewee shows some ability to work collaboratively by mentioning the use of React Native in team development."
                },
                {
                    "trait": "Adaptability",
                    "percent": 40,
                    "trait_type": "Positive",
                    "trait_status": "Low",
                    "reason": "The interviewee demonstrates some adaptability by mentioning the use of different programming concepts and frameworks."
                },
                {
                    "trait": "Critical Thinking",
                    "percent": 70,
                    "trait_type": "Positive",
                    "trait_status": "High",
                    "reason": "The interviewee displays critical thinking skills by providing detailed explanations and examples in response to the questions."
                },
                {
                    "trait": "Integrity",
                    "percent": 80,
                    "trait_type": "Positive",
                    "trait_status": "High",
                    "reason": "The interviewee shows integrity by admitting when they do not know the answer to a question."
                }
            ],
            "communication": [
                {
                    "metrics_name": "Verbal Fluency",
                    "rating": 80,
                    "description": "The interviewee demonstrates good verbal fluency by providing clear and concise explanations for the questions asked."
                },
                {
                    "metrics_name": "Grammar and Vocabulary",
                    "rating": 70,
                    "description": "The interviewee has a good command of grammar and vocabulary, although there are a few minor errors and repetitions."
                },
                {
                    "metrics_name": "Listening Skills",
                    "rating": 80,
                    "description": "The interviewee actively listens to the questions and provides relevant answers."
                },
                {
                    "metrics_name": "Clarity of Ideas",
                    "rating": 80,
                    "description": "The interviewee's ideas are clear and well-organized, making it easy to understand their points."
                },
                {
                    "metrics_name": "Adaptability",
                    "rating": 70,
                    "description": "The interviewee demonstrates some adaptability by providing explanations for different concepts in JavaScript and React Native."
                },
                {
                    "metrics_name": "Answering Questions",
                    "rating": 80,
                    "description": "The interviewee effectively answers the questions asked, providing relevant information."
                },
                {
                    "metrics_name": "Clarity in Technical",
                    "rating": 70,
                    "description": "The interviewee demonstrates a good understanding of technical concepts, although there are a few minor inaccuracies."
                },
                {
                    "metrics_name": "Confidence and Poise",
                    "rating": 70,
                    "description": "The interviewee appears confident and poised throughout the interview."
                },
                {
                    "metrics_name": "Language Proficiency",
                    "rating": 70,
                    "description": "The interviewee has a good level of language proficiency, although there are a few minor errors and repetitions."
                }
            ],
            "skill_matrix": {
                "overal_percent": 35.5,
                "sections": [
                    {
                        "id": "86820375-e154-4c2f-8c2a-900b0fc41ac8",
                        "name": "JavaScript",
                        "rating": 68,
                        "reason": null,
                        "questions": [
                            {
                                "id": "a2cc34f1-31e7-4a86-a097-cee7b8b61e5d",
                                "question": "What is the difference between var, let, and const in JavaScript?",
                                "rating": 75,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [
                                        "'var' keyword has function scope",
                                        "'let' allows reassignment of variable's value"
                                    ],
                                    "covered_partial": [
                                        "'let' and 'const' have block scope",
                                        "'const' does not allow reassignment of variable's value"
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "The var keyword is used to declare the variable with a function scope.",
                                        "Let and const are the blocker scopes, which means they are only accessible within the block they are declared in.",
                                        "The main difference between let and const is that let allows reassignment of the variable while const does not."
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "'var' keyword has function scope",
                                        "'let' and 'const' have block scope",
                                        "'let' allows reassignment of variable's value",
                                        "'const' does not allow reassignment of variable's value"
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: What is the difference between var, let, and const in JavaScript?",
                                    "Interviewee: The var keyword is used to declare the variable with a function scope, meaning it can be accessed within the function it is declared. Let and claust are the blocker scopes, which means they are only accessible with the block they are declared in. The main difference between the let and const is, let allows reassignment of the variable while const does not."
                                ]
                            },
                            {
                                "id": "20722e07-abf9-4da1-8201-d7b7118c0f62",
                                "question": "What is the purpose of arrow functions in JavaScript?",
                                "rating": 60,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [
                                        "They have a more concise syntax."
                                    ],
                                    "covered_partial": [
                                        "Arrow functions are a shorthand syntax for writing function expressions.",
                                        "They do not bind their own 'this' value.",
                                        "They inherit the 'this' value from the surrounding code.",
                                        "Arrow functions are commonly used in React Native development for defining component methods and event handlers."
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "Arrow functions are short-term syntax for writing a function expression.",
                                        "They have more concise syntax, which means they inherit it.",
                                        "This cannot work this value from the surrounding code.",
                                        "The arrow functions are commonly used in React Native development and ReactJS development, which has an ES6 feature."
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Arrow functions are a shorthand syntax for writing function expressions.",
                                        "They have a more concise syntax.",
                                        "They do not bind their own 'this' value.",
                                        "They inherit the 'this' value from the surrounding code.",
                                        "Arrow functions are commonly used in React Native development for defining component methods and event handlers."
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: What is the purpose of arrow functions in JavaScript?",
                                    "Interviewee: Arrow functions are short-term syntax for writing a function expression. They have more concise syntax, which means they inherit it. This cannot work this value from the surrounding code. The arrow functions are commonly used in React Native development and ReactJS development, which has an ES6 feature."
                                ]
                            },
                            {
                                "id": "b7c7b95f-3fc2-40c0-82e4-e1dc7b879445",
                                "question": "What is the difference between synchronous and asynchronous programming in JavaScript?",
                                "rating": 37,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [],
                                    "covered_partial": [
                                        "Synchronous programming executes each line of code one after the other, blocking the execution until a task is completed.",
                                        "Asynchronous programming allows multiple tasks to be executed concurrently, without blocking the execution of the main program.",
                                        "Asynchronous programming is commonly used in JavaScript for tasks such as making API calls or handling user input."
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "Synchronous programming means each line of the code is executed one after another.",
                                        "Synchronous programming allows the multitask to execute concurrently.",
                                        "In JavaScript, synchronous programming is commonly used for tasks such as API calls and handling an AV operation to perform."
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Synchronous programming executes each line of code one after the other, blocking the execution until a task is completed.",
                                        "Asynchronous programming allows multiple tasks to be executed concurrently, without blocking the execution of the main program.",
                                        "Asynchronous programming is commonly used in JavaScript for tasks such as making API calls or handling user input.",
                                        "Waiting for a response in synchronous programming would cause the program to freeze."
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: What is the difference between synchronous and asynchronous programming in JavaScript?",
                                    "Interviewee: Synchronous programming means each line of the code is executed one after another. Synchronous programming allows the multitask to execute concurrently. In JavaScript, synchronous programming is commonly used for tasks such as API calls and handling an AV operation to perform."
                                ]
                            },
                            {
                                "id": "49030679-d332-47a5-bd51-45b4b962993d",
                                "question": "What is the purpose of closures in JavaScript?",
                                "rating": 100,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [
                                        "Closures allow functions to retain access to variables from the outer function.",
                                        "Closures enable the creation of private variables and functions.",
                                        "Closures facilitate data hiding and encapsulation.",
                                        "Closures are used for creating modular and reusable code."
                                    ],
                                    "covered_partial": [],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "Closures in javascript allow functions to retain access to variables from the outer function even after the outer function has finished executing.",
                                        "This allows for the creation of private variables and functions."
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Closures allow functions to retain access to variables from the outer function.",
                                        "Closures enable the creation of private variables and functions.",
                                        "Closures facilitate data hiding and encapsulation.",
                                        "Closures are used for creating modular and reusable code."
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: What is the purpose of closures in JavaScript?",
                                    "Interviewee: Closures in javascript that allows function to retain access to the variable from the outer function even the outer function has finished executing this allows creation of preventing variables and functions."
                                ]
                            }
                        ]
                    },
                    {
                        "id": "41c7f1ed-f6d1-4a67-95a9-ad629f65f280",
                        "name": "React Native",
                        "rating": 29,
                        "reason": null,
                        "questions": [
                            {
                                "id": "08ba3061-3167-4bee-b527-3fade7113b4c",
                                "question": "What is React Native and how does it differ from React.js?",
                                "rating": 50,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [
                                        "React Native is a framework for building mobile applications using JavaScript.",
                                        "It allows developers to write code once and deploy it on both iOS and Android platforms."
                                    ],
                                    "covered_partial": [],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "React Native is a framework for building a mobile application using Javascript.",
                                        "It allows write code once and deploy in Android and iOS also."
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "React Native is a framework for building mobile applications using JavaScript.",
                                        "It allows developers to write code once and deploy it on both iOS and Android platforms.",
                                        "React Native uses native components instead of web components.",
                                        "This makes it more efficient and provides a better user experience compared to React.js, which is primarily used for building web applications."
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: What is React Native and how does it differ from React.js?",
                                    "Interviewee: React Native is a framework for building a mobile application using Javascript. It allows write code once and deploy in Android and iOS also."
                                ]
                            },
                            {
                                "id": "961e0989-fb51-4a00-a57a-d000902d79e0",
                                "question": "Can you explain the concept of JSX in React Native?",
                                "rating": 37,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [],
                                    "covered_partial": [
                                        "JSX is a syntax extension for JavaScript",
                                        "It allows developers to write HTML-like code within JavaScript",
                                        "JSX is used in React Native to define the structure and appearance of user interface components"
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "AXX is a JavaScript XML code used in React Native.",
                                        "It allows developers to write HTML code within JavaScript.",
                                        "It is used to define the structure and appearance of user interference component for mobile development."
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "JSX is a syntax extension for JavaScript",
                                        "It allows developers to write HTML-like code within JavaScript",
                                        "JSX is used in React Native to define the structure and appearance of user interface components",
                                        "JSX is transpiled into regular JavaScript code before execution"
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: Can you explain the concept of JSX in React Native?",
                                    "Interviewee: AXX is a JavaScript XML code, which allows developers to write HTML code within the JavaScript. It is used in React Native to define the structure and appearance of user interference component for the mobile development."
                                ]
                            },
                            {
                                "id": "78e15ce1-7609-4124-8189-074222949623",
                                "question": "How does React Native handle touch events?",
                                "rating": 0,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [],
                                    "covered_partial": [],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "In React Native, touch events can be handled through button pressing, scrolling, and swiping"
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "React Native provides a set of touch event handlers",
                                        "These touch event handlers include onPress, onLongPress, onTouchStart, onTouchMove, and onTouchEnd",
                                        "Developers can use these event handlers to implement various touch-based functionalities in their React Native applications"
                                    ]
                                },
                                "reason": "Answer not met the expectation",
                                "conversation": [
                                    "Interviewer: How does React Native handle touch events?",
                                    "Interviewee: in react native touch event we can handle through button pressing and scrolling and swiping these are the events can handle in react native"
                                ]
                            },
                            {
                                "id": "180c0547-2fa9-437d-847c-35bf064d4765",
                                "question": "What are some best practices for optimizing performance in React Native applications?",
                                "rating": 30,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [],
                                    "covered_partial": [
                                        "Using the FlatList component for rendering large lists",
                                        "Using the shouldComponentUpdate lifecycle method",
                                        "Using the PureComponent class for components that don't need to update frequently"
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "Using a component",
                                        "Using a custom component",
                                        "Reducing unwanted loops",
                                        "Using a functional scope in the component"
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Minimizing the use of inline styles",
                                        "Using the FlatList component for rendering large lists",
                                        "Using the shouldComponentUpdate lifecycle method",
                                        "Using the PureComponent class for components that don't need to update frequently",
                                        "Using the React Native Performance Monitor tool"
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: What are some best practices for optimizing performance in React Native applications?",
                                    "Interviewee: by using a component, custom component and reducing unwanted loops and using a functional scope in the component."
                                ]
                            }
                        ]
                    },
                    {
                        "id": "3ee8b411-5373-4811-a6cd-ad5a5a1190ad",
                        "name": "Mobile App Development",
                        "rating": 9,
                        "reason": null,
                        "questions": [
                            {
                                "id": "ee5a6327-bb9b-4357-acba-d74f9e9e429f",
                                "question": "What is React Native and how does it differ from other mobile app development frameworks?",
                                "rating": 37,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [
                                        "It allows developers to write code once and deploy it on both iOS and Android platforms."
                                    ],
                                    "covered_partial": [
                                        "React Native is a JavaScript framework for building mobile applications."
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "React Native is a framework that allows you to write code with JavaScript.",
                                        "Once you write the code, it can be deployed on both Android and iOS.",
                                        "React Native has major functions for handling mobile development."
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "React Native is a JavaScript framework for building mobile applications.",
                                        "It allows developers to write code once and deploy it on both iOS and Android platforms.",
                                        "React Native uses native components instead of web components.",
                                        "This results in better performance and a more native-like user experience."
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: What is React Native and how does it differ from other mobile app development frameworks?",
                                    "Interviewee: React Native is a framework which can write a code with javascript and once you write a code, it can be deployed in Android and iOS These are the major functions handling with React Native"
                                ]
                            },
                            {
                                "id": "996b263e-afaf-4893-bdf7-e175b22803f5",
                                "question": "Can you explain the concept of touch responsiveness in mobile app development?",
                                "rating": 0,
                                "suggestions": {
                                    "suggestions": [],
                                    "missed_items": [],
                                    "invalid_items": [],
                                    "valid_items": [],
                                    "partial_valid_items": []
                                },
                                "answer_key_points": {
                                    "points": []
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Ability to accurately and quickly respond to user touch inputs",
                                        "Implementing gestures such as tapping, swiping, and pinching",
                                        "Ensuring smooth and delay-free app response",
                                        "Crucial for providing a seamless and intuitive user experience"
                                    ]
                                },
                                "reason": "",
                                "conversation": [
                                    "Interviewer: Can you explain the concept of touch responsiveness in mobile app development?",
                                    "Interviewee: I don't know, sir."
                                ]
                            },
                            {
                                "id": "a7551af7-e4a9-41f7-89c6-b4fac25d1e9c",
                                "question": "How would you optimize the performance of a React Native mobile app with increased touchness?",
                                "rating": 0,
                                "suggestions": {
                                    "suggestions": [],
                                    "missed_items": [],
                                    "invalid_items": [],
                                    "valid_items": [],
                                    "partial_valid_items": []
                                },
                                "answer_key_points": {
                                    "points": []
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Implement techniques such as optimizing rendering and minimizing unnecessary re-renders.",
                                        "Use shouldComponentUpdate or React.memo to prevent unnecessary component updates.",
                                        "Optimize the usage of animations and transitions to ensure smooth and responsive touch interactions."
                                    ]
                                },
                                "reason": "",
                                "conversation": [
                                    "Interviewer: How would you optimize the performance of a React Native mobile app with increased touchness?",
                                    "Interviewee: hello sir can you audible"
                                ]
                            },
                            {
                                "id": "cb98133a-f001-499d-b187-573db3632b27",
                                "question": "What are some best practices for designing user-friendly features in a React Native mobile app with increased touchness?",
                                "rating": 0,
                                "suggestions": {
                                    "suggestions": [],
                                    "missed_items": [],
                                    "invalid_items": [],
                                    "valid_items": [],
                                    "partial_valid_items": []
                                },
                                "answer_key_points": {
                                    "points": []
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Using large and easily tappable buttons and icons to accommodate touch inputs.",
                                        "Implementing intuitive gestures, such as swipe actions or pinch-to-zoom, to enhance user interactions.",
                                        "Providing visual feedback, such as animations or color changes, to indicate touch events.",
                                        "Optimizing the layout and spacing of UI elements to prevent accidental touches.",
                                        "Conducting user testing and gathering feedback to continuously improve the touch responsiveness and overall user experience."
                                    ]
                                },
                                "reason": "",
                                "conversation": [
                                    "Interviewer: What are some best practices for designing user-friendly features in a React Native mobile app with increased touchness?",
                                    "Interviewee: I don't know about the concept of touchness."
                                ]
                            }
                        ]
                    },
                    {
                        "id": "a2f0f416-0cdb-4301-bd2f-220c9f552644",
                        "name": "Debugging",
                        "rating": 24,
                        "reason": null,
                        "questions": [
                            {
                                "id": "11bd9089-8721-497f-8e7d-7381b7eab608",
                                "question": "Can you explain the process you follow when debugging a React Native application?",
                                "rating": 35,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [
                                        "Using console.log statements or debugging tools to track the flow of data"
                                    ],
                                    "covered_partial": [
                                        "Reproducing the issue and identifying the specific problem",
                                        "Identifying any errors or unexpected behavior",
                                        "Checking for relevant error messages or warnings in the console"
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "We can identify the problems using the console.log to debug debug in React Native which can help us to identify the problems in the code structure"
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Reproducing the issue and identifying the specific problem",
                                        "Reviewing the code related to the issue",
                                        "Using console.log statements or debugging tools to track the flow of data",
                                        "Identifying any errors or unexpected behavior",
                                        "Checking for relevant error messages or warnings in the console",
                                        "Fixing the issue by making necessary code changes or implementing a workaround",
                                        "Testing the application to ensure the issue has been resolved"
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: Can you explain the process you follow when debugging a React Native application?",
                                    "Interviewee: We can identify the problems using the console.log to debug debug in React Native which can help us to identify the problems in the code structure"
                                ]
                            },
                            {
                                "id": "4be740c8-f90a-4a10-bd2d-900abc37881f",
                                "question": "How do you approach troubleshooting performance issues in a React Native app?",
                                "rating": 0,
                                "suggestions": {
                                    "suggestions": [],
                                    "missed_items": [],
                                    "invalid_items": [],
                                    "valid_items": [],
                                    "partial_valid_items": []
                                },
                                "answer_key_points": {
                                    "points": []
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Analyze app's performance using profiling tools",
                                        "Look for bottlenecks or areas of high resource usage",
                                        "Review code for potential performance optimizations",
                                        "Identify areas for improvement",
                                        "Make necessary code changes",
                                        "Retest app's performance"
                                    ]
                                },
                                "reason": "",
                                "conversation": [
                                    "Interviewer: How do you approach troubleshooting performance issues in a React Native app?",
                                    "Interviewee: start"
                                ]
                            },
                            {
                                "id": "4ad2ed37-cae9-442c-afd1-5a58f911fea9",
                                "question": "Can you describe a time when you had to debug a difficult issue in a React Native app?",
                                "rating": 12,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [],
                                    "covered_partial": [
                                        "The issue was a random crash in a React Native app",
                                        "The crash was intermittent and difficult to reproduce"
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "The interviewee mentioned a time when they encountered a random crasher in React2.",
                                        "The crasher intermediate is difficult to reproduce.",
                                        "Debugging is a more difficult way to identify and solve the debugging issue."
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "The issue was a random crash in a React Native app",
                                        "The crash was intermittent and difficult to reproduce",
                                        "The approach to debug the issue included analyzing crash logs and identifying patterns",
                                        "Reviewing the code related to the crashing component for memory leaks or improper handling of asynchronous operations",
                                        "Using console.log statements and debugging tools to track data flow and identify potential issues",
                                        "The root cause of the crash was a race condition in the asynchronous data fetching process",
                                        "The issue was fixed by implementing proper synchronization mechanisms",
                                        "Thorough testing was done to ensure the resolution of the crash"
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: Can you describe a time when you had to debug a difficult issue in a React Native app?",
                                    "Interviewee: Yeah, the time when I got a random crasher in react2, the crasher intermediate is difficult to reproduce, the reproduce scenario can be debugging is more difficult way to identify and solve that debugging issue."
                                ]
                            },
                            {
                                "id": "9edfc86f-b7b0-4edd-8b6c-22f9d85bca5c",
                                "question": "How do you handle debugging issues in a React Native app that occur only on specific devices or OS versions?",
                                "rating": 50,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [
                                        "Check for device-specific or OS-specific code"
                                    ],
                                    "covered_partial": [
                                        "Reproduce the issue on a similar device or OS version",
                                        "Leverage the React Native community and online forums",
                                        "Gather information and experiment with different approaches"
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "We can find the device info through the react native device info package",
                                        "We can implement the application using that package",
                                        "We can get the device model and year through the device info",
                                        "By getting the device info, we can identify which model of device is having difficulty with the application"
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Reproduce the issue on a similar device or OS version",
                                        "Use remote debugging tools like React Native Debugger or Chrome DevTools",
                                        "Check for device-specific or OS-specific code",
                                        "Leverage the React Native community and online forums",
                                        "Gather information and experiment with different approaches"
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: How do you handle debugging issues in a React Native app that occur only on specific devices or OS versions?",
                                    "Interviewee: we can find the device info through the react native device info package we can implement that application through that packages we can get the model device model and the device year and structure on that by getting that device info we can identify we can get to the API and we can identify which model of device is getting a difficult on application"
                                ]
                            }
                        ]
                    },
                    {
                        "id": "f0ea236f-6131-48b1-8980-1562a586fc36",
                        "name": "ES6+ Syntax",
                        "rating": -6,
                        "reason": null,
                        "questions": [
                            {
                                "id": "7919a7a3-f077-4d09-94e4-7d4fae19f4b1",
                                "question": "Can you explain the difference between var, let, and const in ES6+ syntax?",
                                "rating": -50,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [],
                                    "covered_partial": [
                                        "Var is function-scoped and can be redeclared and updated within its scope."
                                    ],
                                    "covered_not_valid": [
                                        "Let is block-scoped and can be updated but not redeclared within its scope.",
                                        "Const is also block-scoped but cannot be updated or redeclared after initialization."
                                    ]
                                },
                                "answer_key_points": {
                                    "points": [
                                        "Validation function scope can be redeclared and updated within its scope",
                                        "Blocked scope allows for updating but not redeclaring",
                                        "Consistent blocked scope does not allow for updating or redeclaring",
                                        "Initialization is important"
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Var is function-scoped and can be redeclared and updated within its scope.",
                                        "Let is block-scoped and can be updated but not redeclared within its scope.",
                                        "Const is also block-scoped but cannot be updated or redeclared after initialization."
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: Can you explain the difference between var, let, and const in ES6+ syntax?",
                                    "Interviewee: Validation function scope and can be redeclared and update within its scope Let us say blocked scope and can be updated not to be redeclared within the scope The consistent blocked scope but cannot be updated or redeclared the initialization"
                                ]
                            },
                            {
                                "id": "461477db-9c05-4b6d-a15a-b6217df446fa",
                                "question": "What are arrow functions in ES6+ syntax, and how do they differ from regular functions?",
                                "rating": 37,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [],
                                    "covered_partial": [
                                        "Arrow functions are a shorthand syntax for writing functions in JavaScript.",
                                        "They have a more concise syntax and do not bind their own 'this' value.",
                                        "They are especially useful for writing shorter and more readable code."
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "The arrow functions are the ES6 Advantage ES6 advantage method Which used to create a code shortage and you can write in implicit return",
                                        "But it's differ from the regular function",
                                        "This keyword cannot be Used in arrow function",
                                        "These are the major drawbacks between the normal function and the arrow function"
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "Arrow functions are a shorthand syntax for writing functions in JavaScript.",
                                        "They have a more concise syntax and do not bind their own 'this' value.",
                                        "They are especially useful for writing shorter and more readable code.",
                                        "Unlike regular functions, arrow functions do not have their own 'this', 'arguments', 'super', or 'new.target' bindings."
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: What are arrow functions in ES6+ syntax, and how do they differ from regular functions?",
                                    "Interviewee: The arrow functions are the ES6 Advantage ES6 advantage method Which used to create a code shortage and you can write in implicit return But it's differ from the regular function. This keyword cannot be Used in arrow function. These are the major drawbacks between the normal function and the arrow function"
                                ]
                            }
                        ]
                    },
                    {
                        "id": "a6c346cc-ae0c-4088-9e06-b320ec99a5ab",
                        "name": "RESTful APIs",
                        "rating": 50,
                        "reason": null,
                        "questions": [
                            {
                                "id": "6f956998-b1aa-4e9f-9955-f5bae9f06253",
                                "question": "What is a RESTful API and how does it work?",
                                "rating": 50,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [],
                                    "covered_partial": [
                                        "RESTful API is an architectural style for designing networked applications",
                                        "It stands for Representational State Transfer",
                                        "It uses HTTP methods such as GET, POST, PUT, and DELETE",
                                        "It follows a client-server model",
                                        "The client sends requests to the server and the server responds with the requested data or performs the requested action",
                                        "It uses standard HTTP status codes to indicate the success or failure of a request"
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "RESTful API is the connection between the server and the clients",
                                        "Using a RESTful API allows us to get the response in JSON format",
                                        "The response in JSON format can be data for the frontend to user interaction or user interference"
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "RESTful API is an architectural style for designing networked applications",
                                        "It stands for Representational State Transfer",
                                        "It uses HTTP methods such as GET, POST, PUT, and DELETE",
                                        "It follows a client-server model",
                                        "The client sends requests to the server and the server responds with the requested data or performs the requested action",
                                        "It uses standard HTTP status codes to indicate the success or failure of a request"
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: What is a RESTful API and how does it work?",
                                    "Interviewee: RESTful API, which is the connection between the server and the clients, by using a RESTful API, we get the response in JSON format, which can be data for the frontend to a user interaction or user is interference."
                                ]
                            },
                            {
                                "id": "c551fe55-599e-4337-9158-3ef053eebd4f",
                                "question": "Can you explain the concept of RESTful API endpoints and how they are used?",
                                "rating": 50,
                                "suggestions": {
                                    "suggestions": [],
                                    "covered": [],
                                    "covered_partial": [
                                        "RESTful API endpoints are URLs that represent specific resources or collections of resources.",
                                        "They are used to interact with the API and perform operations on the resources.",
                                        "GET request to the endpoint /users would retrieve a list of all users.",
                                        "POST request to the same endpoint would create a new user.",
                                        "Endpoints can have parameters to specify filters or additional information.",
                                        "/users/{id} would retrieve a specific user based on their ID.",
                                        "API documentation usually provides a list of available endpoints and their corresponding HTTP methods."
                                    ],
                                    "covered_not_valid": []
                                },
                                "answer_key_points": {
                                    "points": [
                                        "The REST endpoints can be included in the URL.",
                                        "There are several methods in HTTP, such as GET, POST, PUT, and DELETE.",
                                        "The GET method is used to retrieve data.",
                                        "The POST method is used to send parameters to the server and retrieve details.",
                                        "In the GET method, parameters can be sent as query parameters by appending them to the URL.",
                                        "The PUT method is used to edit details and send parameters.",
                                        "The DELETE method is used to delete details of a specific user or something.",
                                        "These concepts can be used in REST API.",
                                        "The response can be obtained through the RESTful API."
                                    ]
                                },
                                "expected_answer_key_points": {
                                    "points": [
                                        "RESTful API endpoints are URLs that represent specific resources or collections of resources.",
                                        "They are used to interact with the API and perform operations on the resources.",
                                        "GET request to the endpoint /users would retrieve a list of all users.",
                                        "POST request to the same endpoint would create a new user.",
                                        "Endpoints can have parameters to specify filters or additional information.",
                                        "/users/{id} would retrieve a specific user based on their ID.",
                                        "API documentation usually provides a list of available endpoints and their corresponding HTTP methods."
                                    ]
                                },
                                "reason": "-",
                                "conversation": [
                                    "Interviewer: Can you explain the concept of RESTful API endpoints and how they are used?",
                                    "Interviewee: the REST endpoints can be in URL by giving a URL we can there are the several methods in HTTP method the GET, POST, PUT and DELETE usually the GET methods will get the data and POST method we can send a params to in server and get some details in GET method also we can get and we can send the params but it's in query params we can send appending that query params in that URL and PUT method can be in editor edit and some of the details can be sent the params and DELETE method can delete that details of the particular user or particular something these are the concept we can use in REST API and we can get the response by the RESTful API"
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    )

    const componentRef = useRef(null);
    let basicReportLoader = useLoader(false);
    const [check, setCheck] = useState<any>(0)


    useEffect(() => {
        getBasicReportData()
    }, [])

    useEffect(() => {
        if (basicReportData) {
            removeDuplicates()

        }
    }, [basicReportData])


    const getBasicReportData = () => {
        basicReportLoader.show()
        const params = {
            schedule_id: scheduleId?.id
        }

        dispatch(
            fetchBasicReport({
                params,
                onSuccess: (success) => () => {
                    basicReportLoader.hide()
                    console.log("success===>", success.details)
                    // setBasicReportData(success.details)
                },
                onError: (error) => () => {
                    basicReportLoader.hide()
                },
            })
        );
    }



    const calculateRating = (data: any) => {

        let overallPercent = 0
        if (Array.isArray(data)) {
            data.length > 0 && data.filter((el) => {
                console.log("909090909090909090", +el?.rating)

                overallPercent = el?.percent ? +overallPercent + +el?.percent : +overallPercent + +el?.rating
            })
        }
        return overallPercent ? +overallPercent / data.length : 0
    }


    // const formatDateAndTime = (text) => {
    //     // Define the regex pattern to match multi numbers in date and time format
    //     const dateRegex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;

    //     // Function to replace matched date and time with formatted date and time
    //     const replaceDateAndTime = (match, year, month, day, hour, minute, second) => {
    //       const months = [
    //         'January', 'February', 'March', 'April', 'May', 'June', 'July',
    //         'August', 'September', 'October', 'November', 'December'
    //       ];

    //       // Format the date and time as desired
    //       const formattedDate = `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
    //       const formattedTime = `${parseInt(hour, 10) > 12 ? parseInt(hour, 10) - 12 : hour}:${minute} ${parseInt(hour, 10) >= 12 ? 'pm' : 'am'}`;

    //       // Return the formatted date and time
    //       return `${formattedDate} ${formattedTime}`;
    //     };

    //     // Replace occurrences of multi numbers in date and time format with formatted date and time
    //     return text?.replace(dateRegex, replaceDateAndTime);
    //   };





    function removeDuplicates() {
        let count = 0
        Object.keys(basicReportData).map((el) => {
            console.log('opopopopo', el)
            if (el === 'skill_matrix') {
                basicReportData[el].sections.length > 0 && basicReportData[el].sections.map((item) => {
                    count = count + +basicReportData[el].overal_percent / basicReportData[el].sections.length
                })
            }
            else if (Array.isArray(basicReportData[el])) {
                basicReportData[el].length > 0 && basicReportData[el].map((it) => {
                    count = it.percent ? count + +it.percent / basicReportData[el].length : count + +it.rating / basicReportData[el].length
                })
            }
        })
        console.log("09090======================>", count)
        setCheck(count)
    }



    const commonTableHandler = (data) => {
        return data?.map((el: any) => {
            return {
                expected: el?.expected ? el?.expected : <div className='text-center'>-</div>,
                answered: el?.answered ? el?.answered : <div className='text-center'>-</div>,
                answered_partial: el?.answered_partial ? el?.answered_partial : <div className='text-center'>-</div>,
                invalid_partial: el?.invalid_partial ? el?.invalid_partial : <div className='text-center'>-</div>,
            };
        });
    }


    const loopFunction = (data: any) => {
        let array: any = []
        let length = 0

        Object.keys(data).forEach((items) => {
            if (items === 'expected_answer_key_points') {
                if (data[items]?.points?.length > length) {
                    length = data[items]?.points?.length
                }
            }
            else {
                if (Array.isArray(data?.suggestions[items])) {
                    if (data?.suggestions[items].length > length) {
                        length = data?.suggestions[items].length
                    }
                }
            }
        });

        for (let i = 0; i < length; i++) {
            array.push({
                expected: data['expected_answer_key_points']?.points?.length > 0 ? data['expected_answer_key_points']?.points[i] : '',
                answered: data?.suggestions['covered']?.length > 0 ? data?.suggestions?.covered[i] : '',
                answered_partial: data?.suggestions['covered_partial']?.length > 0 ? data?.suggestions?.covered_partial[i] : '',
                invalid_partial: data?.suggestions['covered_not_valid']?.length > 0 ? data?.suggestions?.covered_not_valid[i] : '',
            })
        }

        return array

    }






    const normalizedTableData = (data: any, heading: any) => {
        return (
            data.length > 0 && data.map((el) => {
                let array: any = loopFunction(el)

                return (
                    <div className='pt-2'>
                        <div className=''>
                            <h5 className='text-black'>{el.question}</h5>
                        </div>
                        <div>
                            <div className='ml-4'>
                                <h5 className='text-black'>Expected Key Points</h5>
                                {el?.expected_answer_key_points?.points?.length > 0 && el?.expected_answer_key_points?.points.map((it) => {
                                    console.log('999999999999999999', el)
                                    return (
                                        <li className='text-sm text-black ml-4'>
                                            {it}
                                        </li>
                                    )
                                })
                                }
                            </div>
                            <div className='pt-4'>
                                <Card className=''>
                                    <CardBody>
                                        <div className='row px-0'>
                                            <div className='col-sm-3 px-0'>
                                                <h4 className='text-black'>Answer</h4>
                                                {el?.suggestions?.covered?.length > 0 && el?.suggestions?.covered.map((item) => {
                                                    return (
                                                        <>
                                                            <li className='text-sm text-black'>
                                                                {item}
                                                            </li>
                                                        </>
                                                    )
                                                })
                                                }
                                            </div >
                                            <hr className='py-0' style={{
                                                border: ' 1px solid gray',
                                                height: 'auto'
                                            }}></hr>
                                            <div className='col-sm-3 px-0'>
                                                <h4 className='text-black'>Answered Partial</h4>
                                                {el?.suggestions?.covered_partial?.length > 0 && el?.suggestions?.covered_partial.map((item) => {
                                                    return (
                                                        <>

                                                            <li className='text-sm text-black'>
                                                                {item}
                                                            </li>

                                                        </>
                                                    )
                                                })
                                                }
                                            </div>
                                            <hr style={{
                                                border: ' 1px solid gray',
                                                height: 'auto'
                                            }}></hr>
                                            <div className='col-sm-3 px-0'>
                                                <h4 className='text-black'>Invalid Answer</h4>
                                                {el?.suggestions?.covered_not_valid?.length > 0 ? el?.suggestions?.covered_not_valid.map((item) => {
                                                    return (
                                                        <>

                                                            <li className='text-sm text-black'>
                                                                {item}
                                                            </li>
                                                        </>
                                                    )
                                                })
                                                    :
                                                    <div className='text-center'>

                                                    </div>
                                                }
                                            </div >
                                        </div>

                                    </CardBody>
                                </Card>
                            </div>
                        </div >

                    </div >

                )
            })
        )
    }


    const colorVariant = (percentage) => {

        if (percentage <= 20) {
            return 'red'
        }
        else if (percentage <= 40) {
            return 'orange'
        }
        else if (percentage <= 60) {
            return '#ebeb1b'
        }
        else if (percentage <= 80) {
            return 'green'
        }
        else if (percentage <= 100) {
            return '#FFD700'
        }
    }


    let array = 0



    return (
        <>

            {!basicReportLoader &&
                <div className='row justify-content-center align-items-center mx-3'
                    style={{
                        height: '90vh'
                    }}
                >
                    <Spinner />
                </div>
            }

            {<div>

                <ReactToPrint
                    trigger={() =>
                        <div className='d-flex position-absolute mr-4 pr-2 '
                            style={{
                                right: '0px',
                            }}
                        >
                            <Button
                                variant={'icon-rounded'}
                                color='info'
                                icons={'bi bi-printer-fill text-white fa-lg'}
                            />

                        </div>
                    }
                    content={() => componentRef.current}
                />

                <div ref={componentRef} className='container-fluid contact'>
                    <div className='row justify-content-end mr-4 pr-3 mt-3'>
                        <Button
                            variant={'icon-rounded'}
                            color='info'
                            icons={'bi bi-envelope-fill text-white fa-lg'}
                        />
                    </div>
                    <div className='row py-4'>
                        <div className='col-sm-12'>
                            <Card>
                                <CardHeader>
                                    <div className='row pl-lg-5 pr-lg-5 pl-sm-0 pl-3 pb-0 pr-sm-0 pr-3 justify-content-between'>
                                        <div className='h1 pt-1 font-weight-bolder text-black'>
                                            {basicReportData.name}
                                            <h5 className='text-black font-weight-bolder'>
                                                {basicReportData.sub_text}
                                            </h5>
                                            <p className='description'>
                                                {basicReportData.sub_text2}
                                            </p>
                                        </div>
                                        <div>
                                            <h1 className='font-weight-bolder display-3'
                                                style={{
                                                    color: colorVariant(+check * 10)
                                                }}
                                            >
                                                {(check / 3).toFixed(1)}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className='row   mx-lg-4 pb-0 mb--2'>

                                        {basicReportData && Object.keys(basicReportData)?.map((heading) => {

                                            return (
                                                dataId.map((el) => {

                                                    if (heading === el) {
                                                        return (
                                                            <>
                                                                <div className='col-sm-4 px-1'>
                                                                    <Card className=' '
                                                                        style={{
                                                                            boxShadow: "rgb(22 21 21 / 8%) 0px 0px 12px 3px"
                                                                        }}
                                                                    >
                                                                        <CardBody className='px-1 pt-2 pb-1'>
                                                                            <div className="progress-wrapper col py-0 m-0 ">
                                                                                <div className="progress-info">
                                                                                    <div className="h4 mb-0 pb-0">
                                                                                        <h4 className='font-weight-bolder text-black text-uppercase'>{heading === 'skill_matrix' ? 'SKILL MATRIX' : heading}</h4>
                                                                                    </div>
                                                                                    <div className="progress-percentage mt--3">
                                                                                        <span
                                                                                            style={{
                                                                                                fontSize: '12px'
                                                                                            }}
                                                                                        >{heading === 'skill_matrix' ? +basicReportData[heading].overal_percent.toFixed(1) : +calculateRating(basicReportData[heading]).toFixed(1)}%</span>
                                                                                    </div>
                                                                                </div>
                                                                                <Progress
                                                                                    className='mt--2'
                                                                                    max="100"
                                                                                    value={heading === 'skill_matrix' ? +basicReportData[heading].overal_percent : +calculateRating(basicReportData[heading])}
                                                                                    style={{
                                                                                        height: '6px',
                                                                                    }}
                                                                                    barStyle={
                                                                                        {
                                                                                            backgroundColor: colorVariant(heading === 'skill_matrix' ? +basicReportData[heading].overal_percent : +calculateRating(basicReportData[heading]))
                                                                                        }
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                    console.log('879868768768')
                                                })
                                            )
                                        })

                                        }
                                    </div>
                                </CardHeader>
                                <CardBody className='ml-1 pb-5'>
                                    {Object.keys(basicReportData)?.map((heading, index) => {

                                        console.log("array", array)

                                        if (heading === "skill_matrix") {
                                            array = array + calculateRating(basicReportData[heading].sections)
                                            return (
                                                <>
                                                    {basicReportData["skill_matrix"]?.sections.length > 0 &&
                                                        <div className='pl-lg-4 pr-lg-5 mr- pt-3 pb-2'>
                                                            <div className='row justify-content-between pr-2 pl-3 pb-3'>
                                                                <h4 className='font-weight-bolder text-black mb-4 text-uppercase'>{'SKILL MATRIX'}</h4>
                                                                <div className='font-weight-bolder display-4'
                                                                    style={{
                                                                        color: colorVariant(+basicReportData[heading].overal_percent)
                                                                    }}
                                                                >
                                                                    {+basicReportData[heading].overal_percent}
                                                                </div>
                                                            </div>

                                                            <>
                                                                {basicReportData && basicReportData["skill_matrix"]?.sections.length > 0 && basicReportData["skill_matrix"]?.sections.map((el) => {

                                                                    return (
                                                                        <>
                                                                            <div className=' px-3 mt--4 mb--2'>

                                                                                <div className='row justify-content-between  align-items-center'
                                                                                >
                                                                                    <div className='pt-4 '>
                                                                                        <h4 className='text-black'>
                                                                                            {el?.name}
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className='row align-items-center'>
                                                                                        <div className="progress-wrapper pb-0 ml-0  pl-0 mr-2"
                                                                                            style={{
                                                                                                width: '30vh'
                                                                                            }}
                                                                                        >
                                                                                            <div className="progress-info">
                                                                                                <div className="progress-label ">
                                                                                                    {/* <span className='ml--3 text-black'>Task completed</span> */}
                                                                                                </div>

                                                                                            </div>
                                                                                            <Progress
                                                                                                className='mr-2'
                                                                                                style={{
                                                                                                    height: '6px',
                                                                                                }}
                                                                                                barStyle={
                                                                                                    {
                                                                                                        backgroundColor: colorVariant(+el?.rating || +el?.percent)
                                                                                                    }
                                                                                                }
                                                                                                max="100" value={el?.rating ? el?.rating : 0} />

                                                                                        </div>
                                                                                        <div className="">
                                                                                            <span className='h6'
                                                                                                style={{
                                                                                                    fontSize: '12px'
                                                                                                }}
                                                                                            >{el?.rating ? el?.rating : 0}%</span>
                                                                                        </div>
                                                                                    </div>


                                                                                </div>
                                                                                <p className='description ml--3'>
                                                                                    {el?.note}
                                                                                </p>
                                                                            </div >
                                                                            {el?.questions?.length > 0 && normalizedTableData(el?.questions, '')}




                                                                            {Object.keys(basicReportData).length - 1 !== index && <div className='mb--3 mx--4'>
                                                                                <Divider />
                                                                            </div>}
                                                                        </>
                                                                    )
                                                                })}
                                                            </>
                                                        </div>}
                                                </>
                                            )
                                        }
                                        else {
                                            return (
                                                dataId.map((el) => {
                                                    if (el === heading && heading !== "skill_matrix") {
                                                        array = array + calculateRating(basicReportData[heading])
                                                        return (
                                                            <>
                                                                {basicReportData[heading].length > 0 && <>
                                                                    <div className='pl-lg-4 pr-lg-5 mr- pt-3 pb-2'>

                                                                        <div className='row justify-content-between pr-2 pl-3 pb-3'>
                                                                            <h4 className='font-weight-bolder text-black mb-4 text-uppercase'>{heading}</h4>
                                                                            <div className='font-weight-bolder display-4'
                                                                                style={{
                                                                                    color: colorVariant(calculateRating(basicReportData[heading]))
                                                                                }}
                                                                            >
                                                                                {calculateRating(basicReportData[heading]).toFixed(1)}
                                                                            </div>
                                                                        </div>
                                                                        {basicReportData && basicReportData[heading].length > 0 && basicReportData[heading].map((el) => {
                                                                            return (
                                                                                <>
                                                                                    <div className=' px-3 my--4'>

                                                                                        <div className='row justify-content-between  align-items-center'
                                                                                        >
                                                                                            <div className='pt-4 '>
                                                                                                <h4 className='text-black'>
                                                                                                    {el?.metrics_name || el?.trait || el?.name}
                                                                                                </h4>
                                                                                            </div>
                                                                                            <div className='row align-items-center'>
                                                                                                <div className="progress-wrapper pb-0 ml-0  pl-0 mr-2"
                                                                                                    style={{
                                                                                                        width: '30vh'
                                                                                                    }}
                                                                                                >
                                                                                                    <div className="progress-info">
                                                                                                        <div className="progress-label ">
                                                                                                            {/* <span className='ml--3 text-black'>Task completed</span> */}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                    <Progress
                                                                                                        className='mr-2'
                                                                                                        style={{
                                                                                                            height: '6px',
                                                                                                        }}
                                                                                                        barStyle={
                                                                                                            {
                                                                                                                backgroundColor: colorVariant(+el?.rating || +el?.percent)
                                                                                                            }
                                                                                                        }
                                                                                                        max="100" value={el?.rating || +el?.percent} />

                                                                                                </div>
                                                                                                <div className="">
                                                                                                    <span className='h6'
                                                                                                        style={{
                                                                                                            fontSize: '12px'
                                                                                                        }}
                                                                                                    >{el?.rating || +el?.percent || 0}%</span>
                                                                                                </div>
                                                                                            </div>


                                                                                        </div>
                                                                                        <p className='description ml--3'>
                                                                                            {el?.description || el?.reason || el?.note}
                                                                                        </p>
                                                                                    </div>
                                                                                    {el?.questions?.length > 0 && el?.questions.map((item) => {
                                                                                        console.log("item===>", item.question)
                                                                                        return (
                                                                                            <>
                                                                                                <div>
                                                                                                    {el?.sub && <div className='my-5 mx--2'
                                                                                                        style={{
                                                                                                            border: '0.5px solid #e9ecef ',
                                                                                                            borderTop: '0px'
                                                                                                        }}
                                                                                                    >
                                                                                                        <CommonTable
                                                                                                            tableDataSet={el?.sub}
                                                                                                            displayDataSet={normalizedTableData(el?.sub, '')}

                                                                                                        />
                                                                                                    </div>}
                                                                                                </div>
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </>
                                                                            )
                                                                        })
                                                                        }
                                                                    </div>
                                                                    {Object.keys(basicReportData).length - 1 !== index && <div className='mb--3 mx--4'>
                                                                        <Divider />
                                                                    </div>}
                                                                </>}
                                                            </>
                                                        )
                                                    }
                                                })
                                            )
                                        }
                                    })

                                    }
                                </CardBody>
                            </Card>
                        </div >
                    </div >
                </div >

            </div>

            }
        </>
    )
}

export { Report }