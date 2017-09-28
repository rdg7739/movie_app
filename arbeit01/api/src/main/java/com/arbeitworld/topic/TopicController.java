package com.arbeitworld.topic;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TopicController {

	@RequestMapping("/topics")
	public List<Topic> getAllTopicks() {
		return Arrays.asList(
				new Topic("1", "name1", "desc1"),
				new Topic("2", "name2", "desc2")
				);
	}
}
