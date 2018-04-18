+++
author = "Lucas Piazza, Director of Marketing"
blurb = "By learning how to leverage ‘share urls’, you can add enormous value to a Yieldmo campaign.  An easy to assemble url can help turn an ad click into a brand related tweet, a facebook like, and much more!"
category = "tutorials"
cover = "/uploads/14970092533_df082d8d9e_z.jpg"
date = "2015-11-09T08:38:33-05:00"
description = ""
layout = "blog"
title = "Using Share Links as Destination URLs"
weight = ""

+++
![](/uploads/URL-01.png)

Though clicks and impressions equal currency in mobile advertising, there are countless other ways to measure the success of a campaign. For instance, many brands may put a value on a ‘share’ or ‘like’ occurring on social media. They may even value such actions above a click or impression.

Imagine a simple [Postcard format](http://adbuilderoldsite.yieldmo.com/#/adbuilder/10) for Hulu. The instinct is to make the destination url something like `[http://hulu.com/](http://hulu.com/ "http://hulu.com/"){NAME_OF_CAMPAIGN}` or `[http://hulu.com/](http://hulu.com/ "http://hulu.com/"){NAME_OF_SHOW}`. Instead of just plugging in a simple URL, imagine adding a different URL – one that can lead to a reader tweeting about a show, pinning a product, or sharing a link on Facebook. The good news is this: share URLs are easy to make, and are already available for all social networks!

Just assemble the URL you want, and plug it in as the destination URL when creating an ad in Ad Builder. Let’s take a look at a few examples below.

**Facebook share link**  
_requirements: destination URL  
_  
A typical campaign for an entertainment advertiser like Netflix or Hulu might promote a new season of a show. While a standard campaign will simply link to Hulu, there are other ways for readers to engage. We can create a destination URL that shares the show link with the reader’s Facebook friends.  We simply need a link!

Let’s say Hulu is trying to remind readers that they offer every episode of Seinfeld. They might want the destination link to be: `[http://www.hulu.com/seinfeld](http://www.hulu.com/seinfeld "http://www.hulu.com/seinfeld")`. Facebook offers us an easy way to share this link. If we combine it with “`[http://www.facebook.com/sharer.php?u=](http://www.facebook.com/sharer.php?u= "http://www.facebook.com/sharer.php?u=")`”, we get `[http://www.facebook.com/sharer.php?u=http://www.hulu.com/seinfeld](http://www.facebook.com/sharer.php?u=http://www.hulu.com/seinfeld "http://www.facebook.com/sharer.php?u=http://www.hulu.com/seinfeld")` as our destination url.

Now, instead of the ad linking to a Hulu landing page, it prompts the user to share the information via Facebook.

**Tweet Link**  
_requirements: destination URL, tweet copy  
_  
In a similar way, an advertiser might value a tweet over a click or share. Let’s say Hillshire Farms wants to raise awareness about their products. Instead of simply linking to their marketing page, we can have their ad generate a tweet from a user.

For this example, we’ll need a link as well as tweet content. If our link is `[http://www.hillshirefarm.com/recipes](http://www.hillshirefarm.com/recipes "http://www.hillshirefarm.com/recipes")`, let’s make the text say “Check out these Delicious Hillshire Farms recipes!”. If we combine that content with twitter’s tweet link (`[http://twitter.com/intent/tweet?text=](http://twitter.com/intent/tweet?text= "http://twitter.com/intent/tweet?text=")`), we’ll have `[http://twitter.com/intent/tweet?text=Check](http://twitter.com/intent/tweet?text=Check "http://twitter.com/intent/tweet?text=Check") out these Delicious Hillshire Farms recipes! [http://www.hillshirefarm.com/recipes](http://www.hillshirefarm.com/recipes "http://www.hillshirefarm.com/recipes")`

If you plug that link into your browser, it will convert spaces into safe characters (%20). Once you do this, the link should look like the following: `[http://twitter.com/intent/tweet?text=Check%20out%20these%20Delicious%20Hillshire%20Farms%20recipes](http://twitter.com/intent/tweet?text=Check%20out%20these%20Delicious%20Hillshire%20Farms%20recipes "http://twitter.com/intent/tweet?text=Check%20out%20these%20Delicious%20Hillshire%20Farms%20recipes")!%20http://www.hillshirefarm.com/recipes`

Now, when the user clicks the ad, they will be redirected to Twitter where they can share Hillshire Farm’s content.

**Pinterest link**  
_requirements: destination URL, Image URL, pin copy/description_

Pinterest is another great example, and would work well for just about any retailer. In this example we use Google Maps, but you can imagine a retailer like JackThreads or J. Crew.

Pinterest’s base “pin” URL looks like this: `[http://pinterest.com/pin/create/button/?url=](http://pinterest.com/pin/create/button/?url= "http://pinterest.com/pin/create/button/?url="){LINK}&media={IMAGE_URL}&description={PIN_COPY}.`

If we want to pin Google Maps, we would use the link `[http://maps.google.com](http://maps.google.com "http://maps.google.com")`, an image: `[http://goo.gl/qnVCCt](http://goo.gl/qnVCCt "http://goo.gl/qnVCCt")`, as well as some text: “Check out Google Maps!”. This would give us the following link as a result: `[http://pinterest.com/pin/create/button/?url=http://maps.google.com&media=http://goo.gl/qnVCCt&description=Check](http://pinterest.com/pin/create/button/?url=http://maps.google.com&media=http://goo.gl/qnVCCt&description=Check "http://pinterest.com/pin/create/button/?url=http://maps.google.com&media=http://goo.gl/qnVCCt&description=Check") out Google Maps!`

Once again, if we plug that into a browser, we’ll see it convert some special characters, giving us the final link of `[http://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fmaps.google.com&media=http%3A%2F%2Fgoo.gl%2FqnVCCt&description=Check+out+Google+Maps](http://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fmaps.google.com&media=http%3A%2F%2Fgoo.gl%2FqnVCCt&description=Check+out+Google+Maps "http://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fmaps.google.com&media=http%3A%2F%2Fgoo.gl%2FqnVCCt&description=Check+out+Google+Maps")!`

Now when the user clicks an ad, they will be taken to Pinterest to pin the item included in the link.

**Calendar Event**  
_requirements: .ics file link._

An even more advanced option is to use a calendar item as a link. This would be a perfect option for a Concert or Sale event. All you need is a link to an .ics file. If an Advertiser has one – great! Just use that as the destination URL (eg. `[http://s3.amazonaws.com/staticoldsite.yieldmo.com/icons/beta/Party_Time.ics](http://s3.amazonaws.com/staticoldsite.yieldmo.com/icons/beta/Party_Time.ics "http://s3.amazonaws.com/staticoldsite.yieldmo.com/icons/beta/Party_Time.ics")`).

If an Advertiser does not have an .ics link, here’s a method for creating one.

1. Create a calendar event here, then download the .ics file it creates: [http://apps.marudot.com/ical/](http://apps.marudot.com/ical/ "http://apps.marudot.com/ical/")
2. Send this file to yourself in an email
3. Open the new email. It will show the file as an attachment, along with a small “download” link. Right click this “download” link, and select “Copy Link Address”.
4. Paste the link in Ad Builder as your destination URL!

When an .ics link is used as a destination URL, the reader will have the option of adding this item to their calendar.  Note that you should always request an .ics file from the client for a live campaign.  Temporary .ics files hosted at Yieldmo or elsewhere should only be used for mocking ads.

**Google Map URL  
**_requirements: Google Map link_****

Another simple option is to create a map link.  Simply put, anything you can search on Google Maps can be turned into a link.  Go to Google maps, and search “Starbuck’s Union Square”.  It will present you with several options – click one.  Once you’ve selected any location on the map, you’ll see a “share” option.  Click that, and you’ve got a map link that can be used in a creative!

You can take it another step further by clicking “Get Directions”.  Type in an origin address, and you’ll be able to select walking, driving or transit directions.  Once you see the directions, select “share or embed map” from the left menu.  Once again, you’ll get a shareable URL.

 

**Conclusion**  
Share URLs aren’t appropriate for every campaign. When they are used, the copy on the ad should inform the reader about the behavior they are about to encounter. For instance, if your destination URL is a link to share a tweet, the reader should know they are about to send a tweet based on the ad copy.

There are examples like the ones above for many other social networks. Think outside the box when designing your next ad, and find out if a share URL is right for the campaign you’re designing in Ad Builder!