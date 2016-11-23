Vue.component('blog-post', {
    props: ['post'],
    template: `
        <li class="list-item" v-bind:class="{ active: isActive }">
            <span class="list-item-wrapper" v-on:click="activate">
                <span class="image"><span class="zekken-logo"></span></span>
                <span class="author">{{ post.author }}</span>
                <span class="content">{{ post.content }}</span>
            </span>
            <span class="controls">
                <span class="control favourite" v-bind:class="{ favourited: isFavourite, loading: isFavouriting }" v-on:click="favourited"></span>
                <span class="control remove" v-on:click="deactivate"></span>
            </span>
        </li>
    `,
    data: function(){
        return {
            isActive: false,
            isFavourite: this.post.isFavourite || false,
            isFavouriting: this.post.isFavourite || false
        };
    },
    methods: {
        activate: function(){
            this.isActive = true;
        },
        deactivate: function(){
            this.isActive = false;
        },
        favourited: function(){
            this.isFavourite = !this.isFavourite;
            this.isFavouriting = !this.isFavouriting;
        }
    }
});

let app = new Vue({
    el: '#app',
    data: {
        posts: data
    }
});
