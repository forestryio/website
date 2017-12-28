+++
author = "Lucas Piazza, Director of Marketing"
blurb = "Since our&nbsp;early commitment&nbsp;to Google’s AMP project, Yieldmo has&nbsp;continued to contribute to this meaningful initiative in pursuit of&nbsp;offering consumers an optimal&nbsp;experience across&nbsp;the mobile web. Recently, the Yieldmo Delivery and AMP teams partnered together to develop a solution to the problems caused by multi-size ad requests.&nbsp;"
category = "updates"
cover = "/_images/portraits/2_daniel.jpg"
date = "2016-09-30T06:10:33-04:00"
description = ""
layout = "blog"
title = "Multi-size Ad Request Support In Google AMP"
weight = ""

+++
##### **September 30, 2016**

Since our [early commitment to Google’s AMP project](http://oldsite.yieldmo.com/2016/03/07/yieldmo-and-amp-a-speedy-and-seamless-mobile-user-experience/), Yieldmo has continued to contribute to this meaningful initiative in pursuit of offering consumers an optimal experience across the mobile web. Recently, the Yieldmo Delivery and AMP teams partnered together to develop a solution to the problems caused by multi-size ad requests.

 

It is common practice for publishers to use multi-size ad requests to optimize revenue across their web properties, and while beneficial to the publisher, this practice has led to a less-than-ideal user experience for their readers. These existing multi-size ad slots can cause pages to reflow, leading to:

 

1. Accidental ad clicks taking the user out of the original and intended content
2. Undesirable content experiences with content bouncing to fit the new ad unit
3. Poor technical performance of the page

 

To offer a better user experience and support publishers’ use of multi-size ad requests, the AMP team enhanced the render-start API so that it accepts an optional size parameter. When this parameter is sent by the ad tech provider, AMP will automatically resize the primary size of the container (when necessary) to fit the creative without causing page reflow — making the problems listed above a thing of the past.

 

Rahul Rao, Director on the Yieldmo Delivery team, explains the experience of partnering with AMP to develop a solution:

#### “Our customers have been asking for multi-size ad request support in AMP, but doing this in a way that wasn’t intrusive to the user experience was a challenge. To offer a solution, Yieldmo collaborated very closely with the AMP team and helped to define the implementation. Integrating with the new API was really easy, and we’re excited to see how this new feature will drive revenue for publishers.”

 

##### [You can read the entire post on the AMP blog](http://amphtml.wordpress.com/2016/09/30/multi-size-ad-request-support-in-amp/) and learn about [our implementation here](http://github.com/ampproject/amphtml/blob/master/ads/yieldmo.md#multi-size-ad).