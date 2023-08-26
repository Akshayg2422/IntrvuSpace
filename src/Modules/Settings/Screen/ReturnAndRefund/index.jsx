import React, { useEffect } from 'react'

function ReturnAndRefund() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <html lang="en" itemScope itemType="http://schema.org/WebPage">

            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png" />
                <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
                <title>
                    Now UI Design System PRO by Creative Tim
                </title>
                {/* <!--     Fonts and icons     --> */}
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700,200|Open+Sans+Condensed:700" rel="stylesheet" />
                {/* <!-- Nucleo Icons --> */}
                <link href="../assets/css/nucleo-icons.css" rel="stylesheet" />
                <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
                {/* <!-- Font Awesome Icons --> */}
                <script src="https://kit.fontawesome.com/42d5adcbca.js" crossOrigin="anonymous"></script>
                {/* <!-- CSS Files --> */}
                <link id="pagestyle" href="../assets/css/now-design-system-pro.css?v=2.2.0" rel="stylesheet" />
            </head>

            <body className="privacy bg-gray-200">
                {/* <!-- Navbar Light --> */}

                {/* <!-- End Navbar --> */}
                <div>
                    <section className="pt-3 pt-md-5 pb-md-5 pt-lg-5">
                        <div className="container-fluid">
                            <div className="col-lg-12 col-md-10 mx-auto pb-5">
                                <div className="card">
                                    <div className="card-header bg-gradient-primary p-5 position-relative">
                                        <h1 className="text-white mb-0">Cancellation and Refund Policies:</h1>
                                        <p className="text-white opacity-8 mb-0">Last modified: Aug 26 2023</p>
                                    </div>
                                    <div className="card-body p-5 pt-0">

                                        <h4 className="mt-5 mb-3">A. Cancellation:</h4>

                                        Users may cancel their subscription at any time by accessing their account settings or by contacting our customer support. Upon cancellation, the subscription will remain active until the end of the current billing cycle, and no further charges will be incurred. Users will continue to have access to the services until the end of the billing cycle.


                                        <h4 className="mt-5 mb-3">B. Refunds:</h4>
                                        <h4 className="mt-5 mb-3">Refunds for subscription fees are subject to the following conditions:</h4>
                                        <b className='h5 text-white opacity-8'>Refund Requests:</b><br></br> Users may request a refund within a specified timeframe (e.g., 30 days) from the initial subscription date or renewal date. Refund requests must be made through customer support or by following the designated refund process outlined on our website.
                                        <div className='mt-4'>
                                            <b className='h5 text-white opacity-8'>Eligibility for Refunds: </b><br></br>Refunds are typically processed in cases where there are technical issues, service unavailability, or failure to deliver the promised services. Refunds may not be granted for reasons other than those mentioned herein.
                                        </div>

                                        <div className='mt-4'>
                                            <b className='h5 text-white opacity-8'>Pro-rated Refunds: </b><br></br> If a refund is approved, the refund amount will be calculated on a pro-rated basis, considering the remaining unused portion of the subscription period.

                                        </div>

                                        <div className='mt-4'>
                                            <b className='h5 text-white opacity-8' >Non-Refundable Fees: </b><br></br>
                                            Refunds, when approved, will be issued to the original payment method used for the subscription payment.


                                        </div>

                                        <h4 className="mt-5 mb-3">C.  Disputed Charges:</h4>
                                        If you believe there has been an unauthorized or incorrect charge on your payment account, please contact our customer support immediately for resolution. We will investigate the matter promptly and take appropriate action to rectify any billing errors or discrepancies.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
              
                {/* <!--   Core JS Files   --> */}
                <script src="../assets/js/core/popper.min.js" type="text/javascript"></script>
                <script src="../assets/js/core/bootstrap.min.js" type="text/javascript"></script>
                <script src="../assets/js/plugins/perfect-scrollbar.min.js"></script>
                {/* <!--  Plugin for TypedJS, full documentation here: https://github.com/mattboldt/typed.js/ --> */}
                <script src="../assets/js/plugins/typedjs.js"></script>
                {/* <!--  Plugin for Parallax, full documentation here: https://github.com/wagerfield/parallax  --> */}
                <script src="../assets/js/plugins/parallax.min.js"></script>
                {/* <!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ --> */}
                <script src="../assets/js/plugins/nouislider.min.js" type="text/javascript"></script>
                {/* <!--  Plugin for the GlideJS Carousel, full documentation here: http://kenwheeler.github.io/slick/ --> */}
                <script src="../assets/js/plugins/glidejs.min.js" type="text/javascript"></script>
                {/* <!--  Plugin for the blob animation --> */}
                <script src="../assets/js/plugins/anime.min.js" type="text/javascript"></script>
                {/* <!-- Chart JS --> */}
                <script src="../assets/js/plugins/chartjs.min.js"></script>
                {/* <!-- Control Center foe Now UI Design System: parallax effects, scripts for the example pages etc --> */}
                {/* <!--  Google Maps Plugin    --> */}
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTTfWur0PDbZWPr7Pmq8K3jiDp0_xUziI"></script>
                <script src="../assets/js/now-design-system-pro.min.js?v=2.2.0" type="text/javascript"></script>
            </body>

        </html>
    )
}

export { ReturnAndRefund }
