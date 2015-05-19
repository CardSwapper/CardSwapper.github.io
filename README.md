# CardSwapper Blog

### Setup

```shell
gem install travis
git clone https://github.com/cardswapr/cardswapr.github.io

cd cardswapr.github.io
git checkout blog
travis encrypt -r cardswapr/cardswapr.github.io 'NAME="Your Name" EMAIL="you@example.com" USER="user" TOKEN=<token> --add env.global'
```

### New Posts

##### 1. Go to the `posts/` folder.

##### 2. Click the `+` button.
![](http://i.imgur.com/cuzM53c.png)

##### 3. Give the post a title.
![](http://i.imgur.com/rKSuHIw.png)

The title on the blog will automatically be converted into __dash delimited title__.
Feel free to use capital letters.

##### 4. Write post in markdown.
![](http://i.imgur.com/zKza0Xn.png)

##### 5. Commit post.
![](http://i.imgur.com/m22WmpZ.png)

##### 6. Wait.
It shouldn't take more than 5 minutes to update.
