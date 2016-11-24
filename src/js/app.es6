Vue.component('blog-post', {
    props: ['post'],
    template: `
        <div class="list-item" v-bind:class="{ active: isActive }">
            <span class="list-item-wrapper" v-on:click="activate">
                <span class="image"><span class="zekken-logo"></span></span>
                <span class="content">{{ trimmedContent }}</span>
                <span class="meta">
                    <span class="author">{{ post.author }}</span>
                    <span class="date">{{ formattedDate }}</span>         
                </span>
            </span>
            <span class="controls">
                <span class="control favourite" v-bind:class="{ favourited: isFavourite, loading: isFavouriting }" v-on:click="favourite"></span>
                <span class="control remove" v-on:click="deactivate"></span>
            </span>
        </div>
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
        favourite: function(){
            this.isFavourite = !this.isFavourite;
            this.isFavouriting = !this.isFavouriting;
        }
    },
    computed: {
        trimmedContent: function () {
            return this.post.content.substring(0, 120) + '...';
        },
        formattedDate: function(){
            return moment(this.post.date).fromNow()
        }
    }
});

Helper.getJson('store/sample-posts.json', function(data){
    Helper.loaded(document.getElementById('app-loader'), function(){
        let app = new Vue({
            el: '#app',
            data: data
        });
    });
});
