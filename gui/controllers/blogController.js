var blogService = require('../services/blogService');

exports.list = function(request, response) {
   response.render("index", {title:"My Blog", entries:blogService.getBlogEntries()});
}

exports.view = function(request, response) {
	if(request.method == 'GET')
	{
   		response.render("article", {title:"My Blog", entry:blogService.getBlogEntry(request.params.id)});
   	}
   	else if(request.method == 'POST')
   	{
   		var blog = blogService.getBlogEntry(request.body.articleID);
		if(blog)
		{
			response.render("article", {title:"My Blog", entry:blog});
		}
		else
		{
			response.render("index", {title:"My Blog", error:"No blog found", entries:blogService.getBlogEntries()});
		}
   	}	
}

exports.add = function(request, response) {
	if(request.method == 'GET')
	{
   		response.render("form", {title:"New Blog"});
   	}
   	else if(request.method == 'POST')
   	{
   		if(blogService.addNewBlog(request.body))
   		{
   			response.redirect("/blog");
   		}
   		else
   		{
   			response.render("form", {error:"Error"});
   		}
   	}	
}