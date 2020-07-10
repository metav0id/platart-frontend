FROM nginx:stable-perl
COPY ssl/platart.com.chained.crt /etc/nginx/platart.com.chained.crt
COPY ssl/platart.com.key /etc/nginx/platart.com.key

#copy custom NGINX configuration
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

COPY /dist/Angular-Inventory-Frontend /usr/share/nginx/html
