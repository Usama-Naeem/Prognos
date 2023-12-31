import React from "react";
import "../AssessmentForm/AssessmentFormStyles.css";
import { useLocation } from "react-router-dom";

export default function StaticResultView() {
  const location = useLocation();
  const url = location.pathname;
  const lastPart = url.substring(url.lastIndexOf("/") + 1);
  const role = lastPart;
  return (
    <div id="assessment-form">
      <div className="bg-white p-[20px] md:p-[60px] rounded-2xl max-w-[1280px] text-md md:text-[17px]">
        <p className="font-[500] text-center text-xl md:text-3xl">
          Result Explanation
        </p>
        {role === "yourLovedOne" ? (
          <p>
            You have indicated that your loved one has a medical diagnosis of
            dementia, which bypasses the educational screening and staging
            features of our application so as not to confuse users. Once a
            diagnosis has been made, you will generally find that the specialist
            who made the diagnosis will not continue to follow your loved one
            closely. But many patients and their families still have questions*
            and feel very anxious about how to manage this disease at home.
            <br />
            <br />
            You may have been assigned a stage of disease at diagnosis or you
            selected one based on your understanding of how advanced your loved
            one&apos;s disease is. Staging has become very complicated and not
            easily interpreted. We put it in lay terms here. At the beginning of
            the disease there may be very subtle changes in recent memory,
            trouble finding words, perception, and/or behavioral issues (mild
            cognitive impairment). These will not impair basic activities of
            daily living like eating, bathing, or brushing your teeth. But the
            symptoms may prevent someone from handling their own finances. Over
            years (though it&apos;s never clear exactly how many), dementia will
            progress. In it&apos;s most severe stage, even standing, talking,
            and swallowing become challenges. Once at your dashboard in the
            application, you will see in your profile that you can restage to
            track change over time. Remember that screening and staging features
            of this app are NOT diagnostic but for educational purposes only.
            <br />
            <br />
            It&apos;s helpful to understand where one is with this disease to
            know what comes next, to prepare, and to avoid preventable injuries
            and illnesses secondary to dementia as it progresses. Traveling back
            in time in our content library allows one to visit the symptoms that
            may have been missed and to access information on brain health
            promotion. This is very useful as an educational tool for family
            caregivers who may themselves be at increased risk.
            <br />
            <br />
            We deliver culturally fluent and language-specific content by stage
            available for and by caregivers in the form of short stories. We
            also provide virtual opportunities for caregivers to connect with
            other caregivers and community health workers locally for care
            navigation and support (to reduce caregiver stress and burnout).
            While we still have no cure for this disease, we are transforming
            our relationship to it and changing our collective outcomes.
            <br />
            <br />
            *We do not ask about the specific kind of dementia diagnosed, as it
            is often a point of confusion. Alzheimer&apos;s, vascular,
            frontotemporal, and Lewy Body Dementia are the most common
            dementias. Dementia can also occur with advanced Parkinson&apos;s
            Disease. These conditions all present with different symptoms, but
            as they progress, they begin to look similar. Our caregivers share
            their experiences with all of these dementias on our platform.
          </p>
        ) : (
          <p>
            You have indicated that you have a medical diagnosis of dementia,
            which bypasses the educational screening and staging features of our
            application so as not to confuse users. Once a diagnosis has been
            made, you will generally find that the specialist who made the
            diagnosis will not continue to follow you closely. But many patients
            and their families still have questions* and feel very anxious about
            how to manage this disease at home.
            <br />
            <br />
            You may have been assigned a stage of disease at diagnosis or you
            selected one based on your understanding of how advanced your
            disease is. Staging has become very complicated and not easily
            interpreted. We put it in lay terms here. At the beginning of the
            disease there may be very subtle changes in recent memory, trouble
            finding words, perception, and/or behavioral issues (mild cognitive
            impairment). These will not impair basic activities of daily living
            like eating, bathing, or brushing your teeth. But the symptoms may
            prevent someone from handling their own finances. Over years (though
            it&apos;s never clear exactly how many), dementia will progress. In
            it&apos;s most severe stage, even standing, talking, and swallowing
            become challenges. Once at your dashboard in the application, you
            will see in your profile that you can restage to track change over
            time. Remember that screening and staging features of this app are
            NOT diagnostic but for educational purposes only.
            <br />
            <br />
            It&apos;s helpful to understand where one is with this disease to
            know what comes next, to prepare, and to avoid preventable injuries
            and illnesses secondary to dementia as it progresses. Traveling back
            in time in our content library allows one to visit the symptoms that
            may have been missed and to access information on brain health
            promotion. This is very useful as an educational tool for family
            caregivers who may themselves be at increased risk.
            <br />
            <br />
            We deliver culturally fluent and language-specific content by stage
            available for and by caregivers in the form of short stories. We
            also provide virtual opportunities for caregivers to connect with
            other caregivers and community health workers locally for care
            navigation and support (to reduce caregiver stress and burnout).
            While we still have no cure for this disease, we are transforming
            our relationship to it and changing our collective outcomes.
            <br />
            <br />
            *We do not ask about the specific kind of dementia diagnosed, as it
            is often a point of confusion. Alzheimer&apos;s, vascular,
            frontotemporal, and Lewy Body Dementia are the most common
            dementias. Dementia can also occur with advanced Parkinson&apos;s
            Disease. These conditions all present with different symptoms, but
            as they progress, they begin to look similar. Our caregivers share
            their experiences with all of these dementias on our platform.
          </p>
        )}
      </div>
    </div>
  );
}
