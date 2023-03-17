const TermsAndConditions = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-base-content">
        Terms and Conditions
      </h1>
      <main className="flex w-full bg-base-300 rounded-xl mt-5 p-5 ">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-primary text-2xl font-semibold">
              Definitely not a scam
            </h2>
            <p className="text-white text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui iure
              error expedita omnis? Fuga magni nihil aliquid deserunt repellat
              neque obcaecati, enim numquam veniam odio blanditiis, porro eum
              quod earum. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Corrupti amet magni dignissimos laboriosam sapiente debitis
              pariatur dolore quia, nihil doloremque laudantium repellendus
              voluptates possimus facilis delectus, aperiam alias, dolorem ut.
            </p>
          </div>
          <div>
            <h2 className="text-primary text-2xl font-semibold">
              This is Elon Ma
            </h2>
            <p className="text-white text-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque,
              itaque. Numquam dicta ipsa provident tempora exercitationem at
              natus, temporibus molestiae reiciendis modi, et ducimus sed ad
              odit eos explicabo quis. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Animi distinctio deserunt blanditiis nostrum
              totam velit excepturi, ad quisquam facere quas adipisci
              reprehenderit, quasi porro minus maxime error repudiandae iste
              aliquam.
            </p>
          </div>
          <div>
            <h2 className="text-primary text-2xl font-semibold">
              Togg otomobilimiz yerli ve milli
            </h2>
            <p className="text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque,
              itaque. Numquam dicta ipsa provident tempora exercitationem at
              natus, temporibus molestiae reiciendis modi, et ducimus sed ad
              odit eos explicabo quis.
            </p>
          </div>
          <div>
            <h2 className="text-primary text-2xl font-semibold">Disclaimer</h2>
            <p className="text-white">
              This is a project for{" "}
              <span className="text-primary text-xl font-bold">
                {" "}
                CMPE 341 course
              </span>
              . We do not take any responsibility for any damages caused by this
              project.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
