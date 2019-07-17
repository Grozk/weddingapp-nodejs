import axios from "axios";
import Vue from "vue";

// tslint:disable-next-line no-unused-expression
new Vue( {
    computed: {
        hasMessages(): boolean {
            return this.isLoading === false && this.messagesCollection.length > 0;
        },
        noMessages(): boolean {
            return this.isLoading === false && this.messagesCollection.length === 0;
        }
    },
    data() {
        return {
            message_id: "",
            wedding_id: "",
            // tslint:disable-next-line: object-literal-sort-keys
            message: "",
            image: "",
            number_sender: "",
            name_sender: "",
            message_sent: false,
            isLoading: true
        };
    },
    el: "#app",
    methods: {
        addMessage() {
            const message = {
                wedding: this.wedding,
                // tslint:disable-next-line: object-literal-sort-keys
                message: this.message,
                image: this.image,
                number_sender: this.number_sender,
                name_sender: this.name_sender
            };
            axios
                .post( "/api/messages/add", message )
                .then( () => {
                    this.wedding = "";
                    this.message = "";
                    this.image = "";
                    this.number_sender = "";
                    this.name_sender = "";
                    this.loadMessages();
                } )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        },
        loadMessages() {
            axios
                .get( "/api/messages/all" , {
                    params: {
                      weddingId : 1,
                    }
                })
                .then( ( res: any ) => {
                    this.isLoading = false;
                    this.messagesCollection = res.data;
                } )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        }
    },
    mounted() {
        return this.loadMessages();
    }
} );
