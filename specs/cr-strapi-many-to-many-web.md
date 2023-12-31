---
testspace: Prognos Us
Title: Test Case
Feature: Strapi Change Request
Test Designer: Khurram Pervaiz
Test Data: https://github.com/EmeraldLabs/prognos-web/issues/674
PRD: https://app.clickup.com/45009286/v/dc/1axjc6-17400/1axjc6-52960
---
# cr-strapi-many-to-many-web
                                                                                                                          
##  ST-01 - Strapi Content can be created by associating multiple stages

**Test Case Type:**  Functional 

**Sub Feature:** Strapi Content Manager

**Scenario:**

To verify that when the user is adding a content, the content can be associated with multiple stages. 

**Pre-conditions:-**

1. User is on the Content Manager screen
2. User is Creating a New Content

**Test Steps:-**

1.User enter the title, description and add a cover content

2.User clicks on the Stage drop down

3.User selects multiple values from the Stage drop down

4.User selects gender

5.User selects race_ethnicity

6.User selects language

7.User clicks on Save

8.User clicks on Publish

**Expected Result:-**

System should add the Content
System should associate multiple Stages with the Content


**Unexpected Result:-**

System does not allow the user to associate multiple Stages with the Content


##  ST-02 - Strapi Content can be added and can be attached to single language only

**Test Case Type:**  Functional 

**Sub Feature:** Strapi Content Manager

**Scenario:**

To verify that when the user is adding a new content, user can only associate one language with the Content

**Pre-conditions:-**

1. User is on the Content Manager screen
2. User is Creating a New Content



**Test Steps:-**

1.User enter the title, description and add a cover content

2.User clicks on the Stage drop down

3.User selects multiple values from the Stage drop down

4.User selects gender

5.User selects race_ethnicity

6.User selects language and verifies that only a single language can be associated with the Content

7.User clicks on Save

8.User clicks on Publish

**Expected Result:-**

System should add the Content
System should only allow a single Language to be associated with the Content
       

**Unexpected Result:-**

System allows to associate multiple languages with the Content



 ##  ST-03 - Strapi Content can be added and can be attached to single Race/Ethnicity only

**Test Case Type:**  Functional 

**Sub Feature:** Strapi Content Manager

**Scenario:**

To verify that when the user is adding a new content, user can only associate one Race/ Etnicity with the Content

**Pre-conditions:-**

1. User is on the Content Manager screen
2. User is Creating a New Content



**Test Steps:-**

1.User enter the title, description and add a cover content

2.User clicks on the Stage drop down

3.User selects multiple values from the Stage drop down

4.User selects gender

5.User selects race_ethnicity and verifies that only a single Race/ Ethnicity can be associated with the Content

6.User selects language 

7.User clicks on Save

8.User clicks on Publish

   


**Expected Result:-**

System should add the Content
System should only allow a single Race/ Ethnicity to be associated with the Content
     

**Unexpected Result:-**

System allows to associate multiple Race/ Ethnicity with the Content


 ##  ST-04 - Strapi Content can be added and can be attached to single Gender only

**Test Case Type:**  Functional 

**Sub Feature:** Strapi Content Manager

**Scenario:**

To verify that when the user is adding a new content, user can only associate one Gender with the Content

**Pre-conditions:-**

1. User is on the Content Manager screen
2. User is Creating a New Content



**Test Steps:-**

1.User enter the title, description and add a cover content

2.User clicks on the Stage drop down

3.User selects multiple values from the Stage drop down

4.User selects gender and verifies that only a single Gender can be associated with the Content

5.User selects race_ethnicity

6.User selects language 

7.User clicks on Save

8.User clicks on Publish

   


**Expected Result:-**

System should add the Content
System should only allow a single Gender to be associated with the Content


**Unexpected Result:-**

System allows to associate multiple Gender with the Content

##  ST-05 - Strapi Content can be edited and can be attached to multiple stages

**Test Case Type:**  Functional 

**Sub Feature:** Strapi Content Manager

**Scenario:**

To verify that when the user is editing a content, the content can be associated with multiple stages. 

**Pre-conditions:-**

1. User is on the Content Manager screen
2. User is Editing a Content

**Test Steps:-**

1.User updates the title, description and cover content

2.User clicks on the Stage drop down

3.User selects multiple values from the Stage drop down

4.User updates gender

5.User updates race_ethnicity

6.User updates language

7.User clicks on Save

**Expected Result:-**

System should update the Content details
System should associate multiple Stages with the Content


**Unexpected Result:-**

System does not allow the user to associate multiple Stages with the Content


##  ST-06 - Strapi Content can be edited and can be attached to single language only

**Test Case Type:**  Functional 

**Sub Feature:** Strapi Content Manager

**Scenario:**

To verify that when the user is editing a content, user can only associate one language with the Content

**Pre-conditions:-**

1. User is on the Content Manager screen
2. User is Editing a Content



**Test Steps:-**

1.User updates the title, description and cover content

2.User clicks on the Stage drop down

3.User selects multiple values from the Stage drop down

4.User updates gender

5.User updates race_ethnicity

6.User updates language and verifies that only a single language can be associated with the Content

7.User clicks on Save

   


**Expected Result:-**

System should update the Content
System should only allow a single Language to be associated with the Content
      

**Unexpected Result:-**

System allows to associate multiple languages with the Content



 ##  ST-07 - Strapi Content can be edited and can be attached to single Race/Ethnicity only

**Test Case Type:**  Functional 

**Sub Feature:** Strapi Content Manager

**Scenario:**

To verify that when the user is editing a content, user can only associate one Race/ Etnicity with the Content

**Pre-conditions:-**

1. User is on the Content Manager screen
2. User is Editing a Content



**Test Steps:-**

1.User enter the title, description and add a cover content

2.User clicks on the Stage drop down

3.User selects multiple values from the Stage drop down

4.User updates gender

5.User updates race_ethnicity and verifies that only a single Race/ Ethnicity can be associated with the Content

6.User updates language 

7.User clicks on Save

8.User clicks on Publish

   


**Expected Result:-**

System should update the Content
System should only allow a single Race/ Ethnicity to be associated with the Content
       

**Unexpected Result:-**

System allows to associate multiple Race/ Ethnicity with the Content


 ##  ST-08 - Strapi Content can be added and can be attached to single Gender only

**Test Case Type:**  Functional 

**Sub Feature:** Strapi Content Manager

**Scenario:**

To verify that when the user is editing a content, user can only associate one Gender with the Content

**Pre-conditions:-**

1. User is on the Content Manager screen
2. User is Editing a Content



**Test Steps:-**

1.User enter the title, description and add a cover content

2.User clicks on the Stage drop down

3.User selects multiple values from the Stage drop down

4.User selects gender and verifies that only a single Gender can be associated with the Content

5.User selects race_ethnicity

6.User selects language 

7.User clicks on Save

8.User clicks on Publish

   


**Expected Result:-**

System should update the Content
System should only allow a single Gender to be associated with the Content
          

**Unexpected Result:-**

System allows to associate multiple Gender with the Content

##  ST-09 - Strapi Content added with multiple stages should be visible on the View Content screen

**Test Case Type:**  Regression

**Sub Feature:** Admin View Content

**Scenario:**

To verify that when the user has added a content with multiple stages, the updated content details are visible on the Admin View Content screen

**Pre-conditions:-**

1. User is on the Content Manager screen
2. User is Adding a New Content



**Test Steps:-**

1.User enter the title, description and add a cover content

2.User clicks on the Stage drop down

3.User selects multiple values from the Stage drop down

4.User selects gender

5.User selects race_ethnicity

6.User selects language 

7.User clicks on Save

8.User clicks on Publish

9. User accesses the Web Admin
    
10. User clicks on View Content option
    
11. User verifies that the columns for Title, Stage, Race/Ethnicity, Language and Gender are populating the correct information against the added Content
   


**Expected Result:-**

System should add the Content
System should allow the Content to be associated with multiple Stages
System should display the newly added content with the information added
          

**Unexpected Result:-**

System is not displaying the added information in the Title, Stage, Race/Ethnicity, Language and Gender columns

##  ST-10 - Strapi Content updated with multiple stages should be visible on the View Content screen

**Test Case Type:**  Regression

**Sub Feature:** Admin View Content

**Scenario:**

To verify that when the user has updated a content with multiple stages, the updated content details are visible on the Admin View Content screen

**Pre-conditions:-**

1. User is on the Content Manager screen
2. User is Updating an existing Content



**Test Steps:-**

1.User updates the title, description and cover content

2.User clicks on the Stage drop down

3.User updates and selects multiple values from the Stage drop down

4.User updates gender

5.User selects race_ethnicity

6.User selects language 

7.User clicks on Save

8.User clicks on Publish

9. User accesses the Web Admin
    
10. User clicks on View Content option
    
11. User verifies that the columns for Title, Stage, Race/Ethnicity, Language and Gender are populating the correct information against the updated Content
   


**Expected Result:-**

System should add the Content
System should allow the Content to be associated with multiple Stages
System should display the updated content with the information updated
          

**Unexpected Result:-**

System is not displaying the updated information in the Title, Stage, Race/Ethnicity, Language and Gender columns
