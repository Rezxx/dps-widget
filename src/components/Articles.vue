<script setup lang="ts">
import keyword_extractor from 'keyword-extractor';
import { ref, watch } from 'vue'
const articles = [
  {
    'title': 'Making changes to your rental car and/or RentalCover dates',
    'description': 'Activate your RentalCover Account, then log in to make a claim, make changes or view your wording.',
    'link': 'https://www.rentalcover.com/en/help/amend-your-cover/192'
  },
  {
    'title': 'How to cancel, extend or shorten your RentalCover Protection',
    'description': 'When you cancel your RentalCover Protection, depending on your country of residence, you may be offered a credit note with a bonus credit that may be used for future bookings...',
    'link': 'https://www.rentalcover.com/en/help/amend-your-cover/193'
  },
  {
    'title': 'What are the cancellation rules for my RentalCover Protection?',
    'description': 'Refund amounts differ based on your RentalCover Protection, when the protection is scheduled to commence and your booking agent (if you booked through one of our partners).',
    'link': 'https://www.rentalcover.com/en/help/amend-your-cover/119'
  },
  {
    'title': 'How do RentalCover credit notes work?',
    'description': 'When you cancel your RentalCover Protection, depending on your country of residence, you may be offered a credit note with a bonus credit that may be used for future bookings...',
    'link': 'https://www.rentalcover.com/en/help/amend-your-cover/193'
  },
  {
    'title': 'What if I change the rental vehicle or rental company?',
    'description': 'Your RentalCover Protection can be used for any rental vehicle*, from any rental company*, subject to the terms of the rental agreement.',
    'link': 'https://www.rentalcover.com/en/help/amend-your-cover/124',
  },
  {
    'title': 'Adding extra drivers and countries to your protection',
    'description': 'The nominated driver and all additional drivers included on your rental agreement are covered by your RentalCover Protection. There is no need to add any additional drivers; they are automatically covered free of charge....',
    'link': 'https://www.rentalcover.com/en/help/amend-your-cover/125',
  },
  {
    'title': 'What happens when RentalCover Protection is cancelled shortly after purchase?',
    'description': 'When you cancel your RentalCover Protection shortly after the purchase, your refund will be processed as a reversal...',
    'link': 'https://www.rentalcover.com/en/help/amend-your-cover/213',
  },
  {
    'title': 'How long after my accident can I make a claim?',
    'description': 'Generally, RentalCover does not have a fixed time limit for you to make a claim unless specified in your wording in your RentalCover Account.',
    'link': 'https://www.rentalcover.com/en/claim',
  },
  {
    'title': 'I paid the full excess for damages. What do I do?',
    'description': 'If you paid the full excess, you will need to submit the final invoice or any other form of evidence from the rental company when making a claim (e.g. a confirmation from the rental company that the repair amount was lower or higher than the excess amount, or that the vehicle was written off).',
    'link': 'https://www.rentalcover.com/en/claim',
  },
  {
    'title': 'Which documents do we need to process your claim?',
    'description': 'To help our team assess your claim as quickly as possible we ask all customers to provide the following documents using our online claims form. ',
    'link': 'https://www.rentalcover.com/en/claim',
  },
  {
    'title': 'Tracking the status of your RentalCover claim',
    'description': 'All claims follow these four stress-free steps:',
    'link': 'https://www.rentalcover.com/en/claim',
  },
  {
    'title': 'How and when will I receive my payment?',
    'description': 'We aim to complete 95% of claims within three business days. ',
    'link': 'https://www.rentalcover.com/en/claim',
  },
  {
    'title': 'How to contact us',
    'description': 'At RentalCover we support our millions of customers via our Help Centre. Should you wish to contact us you can also reply to any of our emails.',
    'link': 'https://www.rentalcover.com/en/help/about-your-cover/149'
  },
  {
    'title': 'What is not covered by RentalCover Protection?',
    'description': 'We often get asked if we offer the following products. You can log in to view the full wording. In summary, here’s what we do cover...',
    'link': 'https://www.rentalcover.com/en/help/about-your-cover/151',
  },
  {
    'title': 'What are the inclusions and exclusions of my protection?',
    'description': 'Inclusions and exclusions can vary, so please check your wording to find out more. You can find your wording attached to your confirmation email, or download it from your account on RentalCover...',
    'link': 'https://www.rentalcover.com/en/help/about-your-cover/170',
  },
  {
    'title': 'How to contact your rental company',
    'description': 'At RentalCover we provide the rental protection and our partners are responsible for the rentals...',
    'link': 'https://www.rentalcover.com/en/help/car-rental/139',
  },
  {
    'title': 'I have cancelled or shortened my RentalCover. When will I receive my refund?',
    'description': 'Refund processing times for RentalCover can differ based on where you booked. If you cancelled or shortened via your RentalCover Account the refund will show on your statement within 4 days.',
    'link': 'I have cancelled or shortened my RentalCover. When will I receive my refund?',
  },
  {
    'title': 'I found a better price, will you match it?',
    'description': 'If you do find a better price anywhere, we are happy to beat it. Just reply to any of our emails and include details of the alternative quote...',
    'link': 'https://www.rentalcover.com/en/help/payments/76'
  },
  {
    'title': 'Who do I contact if my rental deposit wasn\'t returned?',
    'description': 'Rental companies charge a deposit (or put an amount on hold), to make sure you can pay for damages in case of an accident... ',
    'link': 'https://www.rentalcover.com/en/help/payments/212'
  },
  {
    'title': 'What do I do if my payment declines?',
    'description': 'If you\'re experiencing payment issues when purchasing your RentalCover Protection, the following troubleshooting steps may help resolve the issue...',
    'link': 'https://www.rentalcover.com/en/help/payments/195'
  },
  {
    'title': 'Why haven\'t I received my refund yet?',
    'description': 'If you cancel your protection via your RentalCover Account, depending on your country we offer you the option to either receive a credit note or a cash refund...',
    'link': 'https://www.rentalcover.com/en/help/payments/204'
  },
];
const props = defineProps({
  results: String,
})

const filteredArticles = ref([]);

watch(() => props.results, (answer) => {
  const extraction_result =
    keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false
    });

  const matchKeywords = (keywords) => {
    return articles.filter(article => {
      const sentence = (article['title'] + ' ' + article['description']).toLowerCase().replace(/[,.]/g, ' ').split(' ');
      const match = keywords.filter(keyword => sentence.includes(keyword))
      console.log(match)
      return match.length > 0
    })
  };

  filteredArticles.value = matchKeywords(extraction_result)
});

</script>

<template>
  <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <div class="font-mono py-10 text-3xl font-semibold leading-7 tracking-tight text-gray-900" v-if="filteredArticles.length">Have you checked out</div>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="article in filteredArticles" v-bind:key="article.title" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <!-- <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> -->
          <div class="min-w-0 flex-auto">
            <a :href="article.link"><p class="no-underline hover:underline hover:font-semibold font-mono text-lg font-medium leading-6 text-sky-500">{{ article.title }}</p></a>
            <p class="mt-1 truncate text-md leading-5 text-gray-500">{{article.description}}</p>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <a :href="article.link" class="underline mt-1 text-sm font-semibold leading-5 text-gray-900">Read More</a>
        </div>
      </li>
    </ul>
  </div>
</template>