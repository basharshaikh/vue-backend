<template>
    <div class="text-right" v-if="(pagLinks.total > pagLinks.per_page)">
        <div class="relative z-0 inline-flex justify-items-end rounded-md shadow-sm mt-5">
            <div v-for="(link, i) in pagLinks.links">
                <a href="#" 
                    :key="i"
                    :data-url="link.url"
                    :disabled="!link.url"
                    class="relative inline-flex items-center px-4 py-2 border" 
                    :class="[
                    link.active ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',

                    i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
                    i === pagLinks.links.length - 1 ? 'rounded-r-md' : '',
                    ]"
                    @click="getPageData(link)"
                    v-html="link.label"
                ></a>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    pagLinks:{
        type: Object,
        default: {}
    }
})

const emit = defineEmits(["getPageData"]);

function getPageData(link){
    emit("getPageData", link);
}

// pagLinks = {
//     "links": [{"url": null,"label": "&laquo; Previous","active": false}],
//     "per_page": 88,
//     "total": 10
//   }
</script>