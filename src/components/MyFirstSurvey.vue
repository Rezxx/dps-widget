<script setup lang="ts">
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
// import { theme } from "survey-core/themes/layered-dark-panelless";
import Articles from './Articles.vue';
import { ref } from 'vue'
// const SURVEY_ID = 1;

const surveyJson = {
  completedHtml: "Thank you for the feedback! ",
  elements: [
    {
      type: "rating",
      name: "How was your experience with us so far ?",
      rateType: "smileys"
    },
    {
    name: "question",
    title: "How can we improve ?",
    type: "text"
  }]
};

const results = ref('');

const alertResults = (sender: any) => {
  const answer = sender.data;
  results.value = answer.question
  // saveSurveyResults(
  //   "https://your-web-service.com/" + SURVEY_ID,
  //   sender.data
  // )
}


const survey = new Model(surveyJson);
// survey.applyTheme(theme);
survey.onComplete.add(alertResults);

// function saveSurveyResults(url: string | URL, json: object) {
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//     body: JSON.stringify(json)
//   })
//   .then(response => {
//     if (response.ok) {
//       // Handle success
//     } else {
//       // Handle error
//     }
//   })
//   .catch(error => {
//     // Handle error
//   });
// }
</script>

<template>
  <div class="box-content h-500 w-500 px-96">
    <SurveyComponent :model="survey" />
    <Articles :results="results"></Articles>
  </div>
</template>
