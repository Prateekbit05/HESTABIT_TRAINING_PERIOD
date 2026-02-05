module.exports = async (job) => {
  const { to, subject, template, data } = job.data;

  console.log('📧 Sending email');
  console.log({ to, subject, template, data });

  return { success: true };
};
