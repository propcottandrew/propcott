{% extends '../base.swig' %}

{% block head.end %}
	{% parent %}
	<script src='https://www.google.com/recaptcha/api.js'></script>
{% endblock %}

{% block content %}
<div class="container">

	<p style="text-align: center;">
		<a href="/oauth/facebook" class="block" style="display: inline-block; border: 1px solid #eee; margin: 0.5em; padding: .5em 5em;color: white;cursor: pointer;background-color: rgb(0, 119, 255);border-radius: 10px;">Log in with Facebook <span class="typcn typcn-social-facebook"></span></a>
	</p>

	<div class="row">
		<div class="col-6" style="vertical-align: top;">
			<h2 style="margin-top: 0;">Login</h2>
			<form class="form-horizontal" role="form" method="POST">
				{{ csrf_field() }}

				<div class="form-group">
					<label class="col-md-4 control-label">E-Mail Address</label>
					<div class="col-md-6">
						<input type="email" class="form-control" name="email">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-4 control-label">Password</label>
					<div class="col-md-6">
						<input type="password" class="form-control" name="password">
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-6 col-md-offset-4">
						<div class="checkbox">
							<label>
								<input type="checkbox" name="remember"> Remember Me
							</label>
						</div>
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-6 col-md-offset-4">
						<input type="submit" name="login" value="Login" class="btn btn-primary">
						<br>
						<a class="btn btn-link" href="/login/forgot">Forgot Your Password?</a>
					</div>
				</div>
			</form>
		</div>
		<div class="col-6" style="vertical-align: top;">
			<h2 style="margin-top: 0;">Sign up</h2>
			<form class="form-horizontal" role="form" method="POST" action="/register">
				{{ csrf_field() }}

				<div class="form-group">
					<label class="col-md-4 control-label">Name</label>
					<div class="col-md-6">
						<input type="text" class="form-control" name="name">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-4 control-label">E-Mail Address</label>
					<div class="col-md-6">
						<input type="email" class="form-control" name="email">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-4 control-label">Password</label>
					<div class="col-md-6">
						<input type="password" class="form-control" name="password">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-4 control-label">Confirm Password</label>
					<div class="col-md-6">
						<input type="password" class="form-control" name="password_confirmation">
					</div>
				</div>

				<p style="font-weight:bold;font-style:italic;margin:0;">(optional)</p>

				<div class="form-group">
					<label class="col-md-4 control-label">Organization</label>
					<div class="col-md-6">
						<input type="text" class="form-control" name="org">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-4 control-label">Website</label>
					<div class="col-md-6">
						<input type="text" class="form-control" name="org_link">
					</div>
				</div>

				<div class="g-recaptcha" data-sitekey="6Lf7aQkTAAAAAFNIggrxOMkz7cdqoUlCTRImBt6D"></div>
				<noscript>
					<iframe src="https://www.google.com/recaptcha/api/fallback?k=6Lf7aQkTAAAAAFNIggrxOMkz7cdqoUlCTRImBt6D"
						frameborder="0" scrolling="no"
						style="width: 302px; height:423px; border-style: none; margin-bottom: .25em;">
					</iframe>
					<div style="width: 302px; height: 60px; border-style: none; bottom: 12px; left: 25px; margin-bottom: 1em; padding: 0px; right: 25px; background: #f9f9f9; border: 1px solid #c1c1c1; border-radius: 3px;">
						<textarea id="g-recaptcha-response" name="g-recaptcha-response"
							class="g-recaptcha-response"
							style="width: 250px; height: 40px; border: 1px solid #c1c1c1;
							margin: 10px 25px; padding: 0px; resize: none;" >
						</textarea>
					</div>
				</noscript>
				<div class="form-group">
					<div class="col-md-6 col-md-offset-4">
						<input type="submit" name="register" value="Register" class="btn btn-primary">
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
{% endblock %}
