import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import left from "../../../assets/admin/left.png";

import "./CreatePostActivityPackageEvent.scss";
import BadgeService from "../../../services/badge/Badge.Service";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { Badge } from "../../../shared/interfaces/Badge.interface";
import { convertBase64 } from "../../../shared/helper/ConvertBase64";
import { PostImage } from "../../../shared/interfaces/PostImage.interface";
import { CategoryState } from "../../../shared/interfaces/CategoryState.interface";
import { UserAccess } from "../../../shared/interfaces/UserAccess.interface";
import SelectCategoryList from "./SelectCategoryList";
import SelectBadge from "./SelectBadge";
import SelectServices from "./SelectServices";
import PostService from "../../../services/post/Post.Service";
import { ActivityDestination } from "../../../shared/interfaces/ActivityDestination.interface";
import { PostFormsNavigate } from "./PostFormsNavigate";
import { GetCategoryName } from "./GetCategoryName";
import EventService from "../../../services/post/Event.Service";
import SelectContactPerson from "./SelectContactPerson";
import UserService from "../../../services/users/User.Service";
import ActivityPackageService from "../../../services/post/ActivityPackage.Service";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { storage } from "../../../firebase";

const EditPostActivityPackageEvent = () => {
  const location = useLocation();
  const state = location.state as CategoryState;

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;

  const services = [
    { id: 1, text: "Foods" },
    { id: 2, text: "Wifi" },
    { id: 3, text: "Transport" },
    { id: 4, text: "Snacks" },
    { id: 5, text: "Electricity" },
  ];

  const refFileInput = useRef<HTMLInputElement | null>(null);

  const [postCategory, setPostCategory] = useState(
    state?.categoryName || GetCategoryName(state?.category || 0)
  );

  const [isLoading, setIsLoading] = useState(false);

  const [contactPersons, setContactPersons] = useState([] as any[]);
  const [mainContactPerson, setMainContactPerson] = useState({});

  const [mainBadge, setMainBadge] = useState({});
  const [badgeData, setBadgeData] = useState([] as any[]);
  const [subBadges, setSubBadges] = useState([] as any[]);

  const [uploadFiles, setUploadFiles] = useState([] as PostImage[]);

  const [submitData, setsubmitData] = useState({
    id: "",
    user_id: userAccess.user_id, //login user id,
    title: "",
    name: "",
    date: "",
    description: "",
    main_badge_id: "",
    sub_badge_ids: {},
    premium_user: false,
    is_post: true,
    package_note: "",
    extra_cost_per_person: "",
    base_price: "",
    max_price: "",
    min_traveller: 0,
    max_traveller: "",
    package_total_cost: "",
    activity_date: "",
    address: "1600 Amphitheatre Pkwy,  Mountain View,  California,  94043",
    max_extra_person: 100,
    currency_id: "200339a3-5870-462d-9eb8-4b6cfc788886",
    services: "",
  });
  const [postData, setPostData] = useState({
    id: "",
    post_id: "",
    user_id: userAccess.user_id, //login user id
    category_type: state?.category || 1,
    title: "",
    description: "",
    post_date: "",
    main_badge_id: "",
    contact_user_id: "",
    contact_person: "",
    contact_number: "",
    contact_email: "",
    contact_website: "",
    views: 0,
    snapshot_img: "",
    activityBadgeId: "",
    premium_user: false,
    firebase_snapshot_img: "",
  });
  const [packageForms, setPackageForms] = useState({
    id: "",
    activity_package_id: "",
    guide_rules: "",
    local_law_taxes: "",
    release_waiver: "",
  });

  const [defaultDestination, setDefaultDestination] = useState("");
  const [activityDestination, setActivityDestination] = useState(
    {} as ActivityDestination
  );
  const handleGooglePlaceChange = async (obj: any) => {
    console.log(obj);
    const geometry = obj.geometry.location;
    const lat = geometry.lat();
    const lng = geometry.lng();
    setActivityDestination((activityDestination) => ({
      ...activityDestination,
      place_name: obj.formatted_address,
      place_description: obj.formatted_address,
      latitude: lat,
      longitude: lng,
    }));
    //const getpostcode = await fetch(
    //  `https://api.postcodes.io/?lon=${lng}&lat=${lat}`
    //);
    //console.log(getpostcode);
  };

  const handleInputChange = (event: any) => {
    setsubmitData({ ...submitData, [event.target.name]: event.target.value });
  };

  const handlePostInputChange = (event: any) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const handlePackageInputChange = (event: any) => {
    setPackageForms({
      ...packageForms,
      [event.target.name]: event.target.value,
    });
  };

  const [firebaseFiles, setFirebaseFiles] = useState([] as any[]);

  const handleSelectFile = () => {
    refFileInput?.current?.click();
  };

  const removeImage = (id: number) => {
    setUploadFiles((files) => files.filter((f) => f.temp_id !== id));
  };

  const removeImageFromFirebase = (id: number) => {
    const removedImage = firebaseFiles.filter((f) => f.id === id);
    console.log(removedImage);
    const storage = getStorage();

    const desertRef = ref(storage, removedImage[0].filename);

    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("Unable to delete file: ", error);
      });
    deleteImageFrom(postData.category_type, removedImage[0].id).then(
      (res) => {
        console.log("deleteImageFrom: ", res.status);
      },
      (err) => {
        console.log("Error in deleteImageFrom: ", err);
      }
    );
    setFirebaseFiles((files) => files.filter((f) => f.id !== id));
  };

  const deleteImageFrom = (category: number, id: string) => {
    if (category === 1) {
      return ActivityPackageService.deleteActivityPackageDestinationImage(id);
    } else if (category === 3) {
      return EventService.deleteEventDestinationImage(id);
    } else {
      //default destination
      return ActivityPackageService.deleteActivityPackageDestinationImage(id);
    }
  };

  const handleUploadFiles = async (event: any) => {
    const fileObj = [];
    fileObj.push(event.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      const base64 = await convertBase64(fileObj[0][i]);
      setUploadFiles([
        ...uploadFiles,
        {
          temp_id: Math.random(),
          default_img: false,
          snapshot_img: String(base64),
          file: fileObj[0][i],
          filename: uuidv4() + fileObj[0][i].name,
        },
      ]);
    }
  };

  const handleSwitchChange = (event: any) => {
    let premium_user: boolean;
    if (event.target.checked) {
      premium_user = true;
    } else {
      premium_user = false;
    }
    setsubmitData({ ...submitData, premium_user: premium_user });
    setPostData({ ...postData, premium_user: premium_user });
  };

  const handleCategoryChange = (event: any) => {
    setPostCategory(event.target.options[event.target.selectedIndex].text);
    setPostData({ ...postData, category_type: parseInt(event.target.value) });

    //navigate to forms by category type id
    const navigateTo = PostFormsNavigate(
      parseInt(event.target.value),
      event.target.options[event.target.selectedIndex].text
    );
    navigate(navigateTo.path, {
      state: navigateTo.stateCategory,
      replace: true,
    });
  };

  const handleBadgeChange = (obj: any) => {
    setMainBadge(obj);
    setsubmitData({ ...submitData, main_badge_id: obj.id });
    setPostData({
      ...postData,
      main_badge_id: obj.id,
      activityBadgeId: obj.id,
    });
  };

  const handleSubBadgesChange = (event: any) => {
    if (event.target.checked) {
      if (subBadges.length > 4) {
        event.target.checked = false;
        return;
      }
    }
    let updatedList = badgeData.map((item) => {
      if (item.id === event.target.value) {
        return { ...item, isChecked: event.target.checked };
      }
      return item;
    });

    setBadgeData(updatedList);

    if (event.target.checked) {
      if (subBadges.length > 4) {
        event.target.checked = false;
        return;
      }
      setSubBadges(() => [...subBadges, event.target.value]);
      setsubmitData({
        ...submitData,
        sub_badge_ids: [...subBadges, event.target.value],
      });
    } else {
      setSubBadges(subBadges.filter((badge) => badge !== event.target.value));

      setsubmitData({
        ...submitData,
        sub_badge_ids: subBadges.filter(
          (badge) => badge !== event.target.value
        ),
      });
    }
  };

  const handleServicesChange = (obj: any) => {
    //console.log(obj);
    //console.log(Object.values(obj));
    //setsubmitData({ ...submitData, services: obj.toString() });
  };

  const handleContactPerson = (obj: any) => {
    setMainContactPerson(obj);
    setPostData({ ...postData, contact_user_id: obj.id });
  };

  const patchDataTo = (category: number, id: string, data: any) => {
    if (category === 1) {
      return ActivityPackageService.patchActivityPackageData(id, data);
    } else if (category === 3) {
      return EventService.patchActivityEventsData(id, data);
    } else {
      //default destination
      return ActivityPackageService.patchActivityPackageData(id, data);
    }
  };

  const patchDestinationTo = (category: number, id: string, data: any) => {
    if (category === 1) {
      return ActivityPackageService.patchActivityPackageDataDestination(
        id,
        data
      );
    } else if (category === 3) {
      return EventService.patchActivityEventDataDestination(id, data);
    } else {
      //default destination
      return ActivityPackageService.patchActivityPackageDataDestination(
        id,
        data
      );
    }
  };

  const patchActivityFormsTo = (category: number, id: string, data: any) => {
    if (category === 1) {
      return ActivityPackageService.patchActivityPackageFormsData(id, data);
    } else if (category === 3) {
      return EventService.patchActivityEventFormsData(id, data);
    } else {
      //default destination
      return ActivityPackageService.patchActivityPackageFormsData(id, data);
    }
  };

  const postOneImageTo = (category: number, data: any) => {
    //console.log("postOneImageTo submitted data: ", data);
    if (category === 1) {
      return ActivityPackageService.postOneActivityPackageImage(data);
    } else if (category === 3) {
      return EventService.postOneEventImage(data);
    } else {
      //default destination
      return ActivityPackageService.postOneActivityPackageImage(data);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      submitData.sub_badge_ids = subBadges.toString();
      submitData.name = submitData.title;

      submitData.date = postData.post_date;

      //activity post
      postData.title = submitData.name;
      postData.description = submitData.description;

      await patchDataTo(postData.category_type, submitData.id, submitData).then(
        (res) => {
          console.log("patchDataTo: ", res);
        },
        (err) => {
          console.log("Error patchDataTo: ", err);
        }
      );

      await patchDestinationTo(
        postData.category_type,
        activityDestination.id || "",
        activityDestination
      ).then(
        (res1) => {
          console.log("patchDestinationTo: ", res1);
          if (res1.status === 200) {
            //set id for image upload
            for (let i = 0; i < uploadFiles.length; i++) {
              //remove snapshot_img
              uploadFiles[i].snapshot_img = "";

              if (postData.category_type === 1) {
                //activity-package source
                uploadFiles[i].activity_package_destination_id = res1.data.id;
              } else if (postData.category_type === 3) {
                //event source
                uploadFiles[i].activity_event_destination_id = res1.data.id;
              }
            }
          }
        },
        (err1) => {
          console.log("Error patchDestinationTo: ", err1);
        }
      );

      await patchActivityFormsTo(
        postData.category_type,
        packageForms.id,
        packageForms
      ).then(
        (res4) => {
          console.log("postActivityPackageFormsData: ", res4);
        },
        (err4) => {
          console.log("Error postActivityPackageFormsData: ", err4);
        }
      );

      //firebase upload
      try {
        if (uploadFiles.length > 0) {
          for (let i = 0; i < uploadFiles.length; i++) {
            const imageRef = ref(storage, `web/${uploadFiles[i].filename}`);
            await uploadBytes(imageRef, uploadFiles[i].file).then(
              (snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                  postOneImageTo(postData.category_type, {
                    activity_package_destination_id:
                      uploadFiles[i].activity_package_destination_id,
                    activity_event_destination_id:
                      uploadFiles[i].activity_event_destination_id,
                    firebase_snapshot_img: url,
                    filename: `web/${uploadFiles[i].filename}`, //save filename
                  }).then(
                    (res) => {
                      console.log("postOneImageTo: ", res);
                    },
                    (err) => {
                      console.log("Error in postOneImageTo: ", err);
                    }
                  );

                  if (i === uploadFiles.length - 1) {
                    postData.firebase_snapshot_img = url;
                    PostService.patchActivityPost(postData.id, postData).then(
                      (res) => {
                        console.log("patchActivityPost: ", res);
                        if (res.status === 200) {
                          setIsLoading(false);
                          navigate("/post", {
                            state: {
                              status: true,
                              message: "Post successfully updated.",
                            },
                            replace: true,
                          });
                        }
                      },
                      (err) => {
                        console.log("Error in patchActivityPost: ", err);
                        setIsLoading(false);
                      }
                    );
                  }
                });
              }
            );
          }
        } else {
          if (firebaseFiles.length > 0) {
            postData.firebase_snapshot_img =
              firebaseFiles[0].firebase_snapshot_img;
          } else {
          }
          PostService.patchActivityPost(postData.id, postData).then(
            (res) => {
              console.log("patchActivityPost: ", res);
              if (res.status === 200) {
                setIsLoading(false);
                navigate("/post", {
                  state: {
                    status: true,
                    message: "Post successfully updated.",
                  },
                  replace: true,
                });
              }
            },
            (err) => {
              console.log("Error in patchActivityPost: ", err);
              setIsLoading(false);
            }
          );
        }
      } catch (err) {
        console.log("Error in firebase upload: ", err);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error handleSubmit: ", error);
    }
  };

  //Update badge data with image
  const setBadgeWithImg = useCallback(
    async (
      badges: Badge[],
      defaultBadgeId?: string,
      defaultSubBadgeIds?: string
    ) => {
      let badgeWithImg: Badge[] = [];
      const base64Flag = "data:image/png;base64,";
      await Promise.all(
        badges.map(async (badge: any) => {
          badge.imgBase64 = `${base64Flag}${badge.img_icon}`;
          if (defaultSubBadgeIds?.includes(badge.id)) {
            badge.isChecked = true;
          } else {
            badge.isChecked = false;
          }
          badgeWithImg.push(badge);
        })
      );
      setBadgeData(badgeWithImg);

      const currentBadge = badgeWithImg.filter(
        (badge) => badge.id === defaultBadgeId
      );

      //initial/current value for react-select main badge
      setMainBadge(currentBadge[0]);

      //set current sub badges
      setSubBadges(defaultSubBadgeIds?.split(",") || []);

      //set current main badge
      setsubmitData((submitData) => ({
        ...submitData,
        main_badge_id: currentBadge[0].id,
      }));
    },
    []
  );

  const getDataFrom = (category: number, post_id: string) => {
    if (category === 1) {
      return ActivityPackageService.getActivityPackageData(post_id);
    } else if (category === 3) {
      return EventService.getEventData(post_id);
    }
    return ActivityPackageService.getActivityPackageData(post_id);
  };

  const getDestinationFrom = (category: number, post_id: string) => {
    if (category === 1) {
      return ActivityPackageService.getActivityPackageDestination(post_id);
    } else if (category === 3) {
      return EventService.getEventData(post_id);
    }
    return ActivityPackageService.getActivityPackageDestination(post_id);
  };

  const getFormsFrom = (category: number, post_id: string) => {
    if (category === 1) {
      return ActivityPackageService.getActivityPackageForms(post_id);
    } else if (category === 3) {
      return EventService.getActivityEventForms(post_id);
    }
    return ActivityPackageService.getActivityPackageForms(post_id);
  };

  const getImageFrom = (category: number, post_id: string) => {
    if (category === 1) {
      return ActivityPackageService.getActivityPackageImages(post_id);
    } else if (category === 3) {
      return EventService.getEventImages(post_id);
    }
    return ActivityPackageService.getActivityPackageImages(post_id);
  };

  const getData = useCallback(async () => {
    let defaultBadgeId: string | "";
    let defaultSubBadgeIds: string | "";
    let postId: string | "" = "";
    let data: any | {} = {};
    let destinationData: any | {} = {};
    let postServiceData: any | {} = {};
    try {
      await getDataFrom(state.category, state?.post_id || "").then(
        (res) => {
          if (res.status === 200) {
            data = res.data;

            postId = data.id;

            defaultBadgeId = data.main_badge_id;
            defaultSubBadgeIds = data.sub_badge_ids;

            setsubmitData((submitData) => ({
              ...submitData,
              id: data.id,
              premium_user: data.premium_user,
              title: data.name,
              name: data.name,
              description: data.description,
              date: moment(data.date).format("yyyy-MM-DD"),
              activity_date: moment(data.activity_date).format("yyyy-MM-DD"),
              main_badge_id: defaultBadgeId,
              max_traveller: data.max_traveller,
              base_price: data.base_price,
              package_total_cost: data.package_total_cost,
              extra_cost_per_person: data.extra_cost_per_person,
              max_price: data.max_price,
              package_note: data.package_note,
            }));
          }
        },
        (err) => {
          console.log("Error in getDataFrom: ", err);
        }
      );

      await getDestinationFrom(state.category, state?.post_id || "").then(
        (res) => {
          if (res.status === 200) {
            destinationData = res.data[0];
            setActivityDestination((activityDestination) => ({
              ...activityDestination,
              id: destinationData.id,
              activity_event_id: destinationData.activity_event_id,
              activity_package_id: destinationData.activity_package_id,
              place_name: destinationData.place_name,
              place_description: destinationData.place_description,
              latitude: destinationData.latitude,
              longitude: destinationData.longitude,
            }));
            setDefaultDestination(destinationData.place_name);
          }
        },
        (err) => {
          console.log("Error in getDestinationFrom: ", err);
        }
      );

      await getImageFrom(state.category, destinationData.id).then(
        (res) => {
          if (res.status === 200) {
            setFirebaseFiles(res.data);
          }
        },
        (err) => {
          console.log("Error in getImageFrom: ", err);
        }
      );

      await getFormsFrom(state.category, state?.post_id || "").then(
        (res) => {
          if (res.status === 200) {
            let formsData = res.data[0];
            setPackageForms((packageForms) => ({
              ...packageForms,
              id: formsData.id,
              activity_package_id: formsData.activity_package_id,
              local_law_taxes: formsData.local_law_taxes,
              guide_rules: formsData.guide_rules,
              release_waiver: formsData.release_waiver,
            }));
          }
        },
        (err) => {
          console.log("Error in getDestinationFrom: ", err);
        }
      );

      await PostService.getActivityPostByPostId(postId).then(
        (res) => {
          postServiceData = res.data;
          setPostData((postData) => ({
            ...postData,
            id: postServiceData.id,
            title: postServiceData.title,
            description: postServiceData.description,
            premium_user: data.premium_user,
            main_badge_id: data.main_badge_id,
            activityBadgeId: data.main_badge_id,
            post_id: postServiceData.post_id,
            contact_email: postServiceData.contact_email,
            contact_person: postServiceData.contact_person,
            contact_website: postServiceData.contact_website,
            contact_number: postServiceData.contact_number,
            post_date: moment(postServiceData.post_date).format("yyyy-MM-DD"),
          }));
        },
        (err) => {
          console.log("Error in getActivityPostByPostId:", err);
        }
      );

      await BadgeService.loadData().then(
        (res) => {
          setBadgeWithImg(res.data, defaultBadgeId, defaultSubBadgeIds);
        },
        (error) => {
          console.log("Error BadgeService: ", error);
        }
      );

      await UserService.getUsers().then(
        (res) => {
          const contacts = res.data.data;
          //console.log("Contacts: ", contacts);
          //console.log("Current contact id: ", postServiceData.contact_user_id)
          const currentContact = contacts.filter(
            (contact: any) => contact.id === postServiceData.contact_user_id
          );
          setContactPersons(contacts);
          //console.log(currentContact);
          if (currentContact.length > 0) {
            setMainContactPerson(currentContact[0]); //set current contact user
          }
        },
        (error) => {
          console.log("Error in getUsers:", error);
        }
      );
    } catch (error) {
      console.log("Error in getData:", error);
    }
  }, [
    state.post_id,
    state.category,
    setBadgeWithImg,
    setsubmitData,
    setPackageForms,
  ]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container className="create-post-activitypackage-container mb-5">
      <Row className="mt-5">
        <Col className="col-6">
          <Row>
            <Col className="col-2">
              <Link to={`/post`} className="btn btn-bck">
                <Image className="" src={left} alt="" />
              </Link>
            </Col>
            <Col>
              <h2>Edit {postCategory}</h2>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="ms-3 me-3 post-form">
          <Form className="m-5" onSubmit={(e) => handleSubmit(e)}>
            <Row>
              <Col className="col-4">
                <Form.Label>Category</Form.Label>
                <SelectCategoryList
                  userAccess={userAccess}
                  categoryType={postData.category_type}
                  setCategoryType={handleCategoryChange}
                  disabled={true}
                />
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <label htmlFor="site_state" className="form-check-label">
                  Premium User
                </label>
                <div className="form-switch form-check ms-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="site_state"
                    onChange={(e) => handleSwitchChange(e)}
                    checked={submitData.premium_user}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="mt-2 col-10">
                <hr />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="col-4">
                <Form.Label>Select Main Badge</Form.Label>
                <SelectBadge
                  mainBadge={mainBadge}
                  badgeData={badgeData}
                  handleBadgeChange={(option: any) => handleBadgeChange(option)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Label>Select Sub badge (Maximum 5 badges)</Form.Label>
              </Col>
            </Row>
            <Row className=" pt-2">
              <Col>
                {badgeData.map((item: any) => (
                  <div
                    key={item.id}
                    className="chk-multiple-badge form-check form-check-inline"
                  >
                    <input
                      className="chkbox-badge form-check-input"
                      type="checkbox"
                      id={item.id}
                      value={item.id}
                      onChange={(checked) => {
                        handleSubBadgesChange(checked);
                      }}
                      checked={item.isChecked}
                    />
                    <label
                      htmlFor={item.id}
                      className="form-check-label form-check-label-badge"
                    >
                      <img
                        className="chk-badge-img"
                        src={item.imgBase64}
                        alt={item.badge_name}
                      />
                    </label>
                    <Row>
                      <Col>{item.badge_name}</Col>
                    </Row>
                  </div>
                ))}
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Label>
                  Upload multiple images (Maximum 5 images)
                </Form.Label>
              </Col>
            </Row>
            <Row className="upload-img ps-2 pt-2">
              {firebaseFiles.map((img: any) => (
                <Col
                  className="col-2 d-flex justify-content-center align-items-center me-1 p-0"
                  key={img.id}
                >
                  <button
                    type="button"
                    className="btn-close btn-remove-img"
                    aria-label="Close"
                    onClick={() => {
                      removeImageFromFirebase(img.id);
                    }}
                  ></button>
                  <img
                    className="w-100 prev-img img-fluid rounded mx-auto d-block"
                    src={img.firebase_snapshot_img}
                    alt="..."
                  />
                </Col>
              ))}
              {uploadFiles.map((img: any) => (
                <Col
                  key={img.temp_id}
                  className="col-2 d-flex justify-content-center align-items-center me-1 p-0"
                >
                  <button
                    type="button"
                    className="btn-close btn-remove-img"
                    aria-label="Close"
                    onClick={() => {
                      removeImage(img.temp_id);
                    }}
                  ></button>
                  <img
                    className="w-100 prev-img img-fluid rounded mx-auto d-block"
                    src={img.snapshot_img}
                    alt="..."
                  />
                </Col>
              ))}
              {uploadFiles.length < 5 && (
                <Col className="col-2 me-2 d-flex justify-content-center align-items-center">
                  <input
                    type="file"
                    ref={refFileInput}
                    className="form-control d-none"
                    onChange={handleUploadFiles}
                  />
                  <button
                    onClick={handleSelectFile}
                    className="btn btn-file-upload"
                    type="button"
                  >
                    +
                  </button>
                </Col>
              )}
            </Row>
            <Row className="mt-4">
              <Col className="mt-3 col-8">
                <Form.Control
                  autoComplete="off"
                  className="input-title"
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={submitData.title}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  className="input-date"
                  placeholder="Set Availability"
                  name="post_date"
                  value={postData.post_date}
                  onChange={(e) => handlePostInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Description of event"
                  rows={7}
                  maxLength={200}
                  className="input-description"
                  name="description"
                  value={submitData.description}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="col-4">
                <SelectContactPerson
                  mainContact={mainContactPerson}
                  contactPersons={contactPersons}
                  handleContactPerson={handleContactPerson}
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="input-email"
                  type="text"
                  placeholder="Email Address"
                  name="contact_email"
                  value={postData.contact_email}
                  onChange={(e) => handlePostInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="input-contact-number"
                  type="text"
                  placeholder="Contact Number"
                  name="contact_number"
                  value={postData.contact_number}
                  onChange={(e) => handlePostInputChange(e)}
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="input-website"
                  type="text"
                  placeholder="Website"
                  name="contact_website"
                  value={postData.contact_website}
                  onChange={(e) => handlePostInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mt-4">
                <h4>Location</h4>
              </Col>
            </Row>
            <Row>
              <Col className="col-10">
                <hr />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <ReactGoogleAutocomplete
                  apiKey={process.env.REACT_APP_GOOGLE}
                  onPlaceSelected={(place) => handleGooglePlaceChange(place)}
                  className="form-control form-loc input-location"
                  defaultValue={defaultDestination || ""}
                />
                <div className="ms-4 form-text label-pin-loc">
                  Pin location location
                </div>
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-loc input-street"
                  type="text"
                  placeholder="Street"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-loc input-city"
                  type="text"
                  placeholder="City"
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-loc input-province"
                  type="text"
                  placeholder="Province/Territory"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-loc input-postal-code"
                  type="text"
                  placeholder="Postal Code"
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mt-4">
                <h4>Activity Package</h4>
              </Col>
            </Row>
            <Row>
              <Col className="col-10">
                <hr />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="col-4">
                <Form.Label></Form.Label>
                <Form.Control
                  autoComplete="off"
                  className="mt-1 form-pack input-traveler-limit"
                  type="text"
                  placeholder="Traveler Limit"
                  name="max_traveller"
                  value={submitData.max_traveller}
                  onChange={handleInputChange}
                />
              </Col>
              <Col className="col-4">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  className="form-pack input-pack-date"
                  placeholder="Set Availability"
                  name="activity_date"
                  value={submitData.activity_date}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-pack input-base-price"
                  type="number"
                  name="base_price"
                  placeholder="Base price"
                  value={submitData.base_price}
                  onChange={handleInputChange}
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-pack input-package-total-cost"
                  type="text"
                  placeholder="Package total cost"
                  name="package_total_cost"
                  value={submitData.package_total_cost}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-pack input-extra-cost-per-person"
                  type="text"
                  name="extra_cost_per_person"
                  placeholder="Extra cost per person"
                  onChange={handleInputChange}
                  value={submitData.extra_cost_per_person}
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-pack input-max-price"
                  type="text"
                  placeholder="Max price"
                  name="max_price"
                  value={submitData.max_price}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Additional notes"
                  rows={7}
                  maxLength={200}
                  className="input-additional-notes"
                  name="package_note"
                  value={submitData.package_note}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Form.Label>Free services (Maximum 5)</Form.Label>
              <Col className="col-4">
                <SelectServices
                  services={services}
                  handleServicesChange={handleServicesChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Guide Rules & What to Bring"
                  rows={5}
                  maxLength={200}
                  className="input-guide-rules"
                  name="guide_rules"
                  onChange={(e) => handlePackageInputChange(e)}
                  value={packageForms.guide_rules}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Local Laws & Taxes"
                  rows={5}
                  maxLength={200}
                  className="input-locallaws"
                  name="local_law_taxes"
                  onChange={(e) => handlePackageInputChange(e)}
                  value={packageForms.local_law_taxes}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Waiver Screen"
                  rows={5}
                  maxLength={200}
                  className="input-waiver"
                  name="release_waiver"
                  onChange={(e) => handlePackageInputChange(e)}
                  value={packageForms.release_waiver}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mt-5">
                {!isLoading && (
                  <button type="submit" className="btn-submit">
                    Confirm
                  </button>
                )}
                {isLoading && (
                  <button className="btn-submit" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default EditPostActivityPackageEvent;
