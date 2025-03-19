export const checkValidationUtils = (type, addDefaultApp) => {
  switch (type?.toLowerCase()) {
    case "video":
      if (!addDefaultApp?.url?.trim()) {
        return "Video File or URL is required";
      }
      break;
    case "music":
      if (!addDefaultApp?.url?.trim()) {
        return "Music File or URL is required";
      }
      break;

    case "gallery":
      if (!addDefaultApp?.url?.trim()) {
        return "Gallary File or URL is required";
      }
      break;

    case "rich-texts":
      if (!addDefaultApp?.content?.trim()) {
        return "Text is required";
      }
      break;

    case "separator":
      if (!addDefaultApp?.content?.trim()) {
        return "Separator Content is required";
      }
      break;

    case "polls":
      try {
        const pollData = JSON.parse(addDefaultApp?.content);
        if (!pollData?.question?.trim()) {
          return "Please enter a question for the poll.";
        }
        if (!Array.isArray(pollData?.options) || pollData.options.length < 2) {
          return "At least two options are required for the poll.";
        }
        if (pollData.options.some((option) => !option.trim())) {
          return "All poll options must have a value.";
        }
      } catch (error) {
        return "Invalid poll data format.";
      }
      break;
    case "calendly":
    case "youtube":
    case "vimeo":
    case "spotify":
    case "topmate":
    case "soundcloud":
      if (!addDefaultApp?.url?.trim()) {
        return `Please Enter URL`;
      }
      break;
    case "digital downloads":
      try {
        const pollData = JSON.parse(addDefaultApp?.content);
        if (!pollData?.file_name?.trim()) {
          return "Please enter File Name.";
        }
        if (!pollData?.file_description?.trim()) {
          return "Please enter File Description";
        }
        if (!pollData?.file_link?.trim()) {
          return "Please enter File Link";
        }
      } catch (error) {
        return "Please fill up form.";
      }
      break;
    case "discount code":
      try {
        const pollData = JSON.parse(addDefaultApp?.thumbnail);
        if (!pollData?.couponName?.trim()) {
          return "Please enter Coupon Name.";
        }
        if (!pollData?.couponCode?.trim()) {
          return "Please enter Coupon Code";
        }
      } catch (error) {
        return "Please fill up form.";
      }
      break;
    case "trustpilot review":
      if (addDefaultApp?.url?.endsWith("review/")) {
        return "Please enter company name";
      }
      break;
    case "github repo list":
      try {
        const repoList = JSON.parse(addDefaultApp?.thumbnail);

        if (Array.isArray(repoList) && repoList?.length === 0) {
          return "Please add at least one repository.";
        }
        if (Array.isArray(repoList)) {
          for (const repo of repoList) {
            if (!repo?.name?.trim()) {
              return "Each repository must have a valid name.";
            }
            if (!repo?.html_url?.trim()) {
              return "Each repository must have a valid GitHub URL.";
            }
          }
        }
      } catch (error) {
        return "Invalid repository data format.";
      }
      break;
    case "mobile app":
      try {
        const apkList = JSON.parse(addDefaultApp?.thumbnail);

        // if (!Array.isArray(apkList) || apkList?.length === 0) {
        //   return "Please add at least one Apk";
        // }
      } catch (error) {
        return "Please Add Apk data";
      }
      break;
    case "faqs":
      try {
        const apkList = JSON.parse(addDefaultApp?.thumbnail);

        if (!Array.isArray(apkList) || apkList?.length === 0) {
          return "Please add at least one Faq";
        }
      } catch (error) {
        return "Please Add Faq data";
      }
      break;

    default:
      return null;
  }

  return null;
};
