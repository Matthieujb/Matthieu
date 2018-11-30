window.onload = () => {
	let context = window.document.getElementsByTagName("canvas")[0].getContext("2d");
	console.log("Début du code");
	//raccourcis
	var b2World 		  = Box2D.Dynamics.b2World;
	var b2Vec2 			  = Box2D.Common.Math.b2Vec2;
	var b2ContactListener = Box2D.Dynamics.b2ContactListener;
	var b2DebugDraw 	  = Box2D.Dynamics.b2DebugDraw;
	var b2BodyDef		  = Box2D.Dynamics.b2BodyDef;
	var b2Body 			  = Box2D.Dynamics.b2Body;
	var b2FixtureDef 	  = Box2D.Dynamics.b2FixtureDef;
	var b2Fixture 		  = Box2D.Dynamics.b2Fixture;
	var b2CircleShape 	  = Box2D.Collision.Shapes.b2CircleShape;
	var b2PolygonShape 	  = Box2D.Collision.Shapes.b2PolygonShape;
	//var b2AABB = Box2D.Collision.b2AABB;

	function CreateBall(_x,_y,_radius,_density,_restitution){
		//créer la "matière" (b2body) pour la bille
		let billeBodyDef = new b2BodyDef();
		billeBodyDef.position.Set(_x/scale,_y/scale);
		billeBodyDef.type = b2Body.b2_dynamicBody;
		let billeBody = world.CreateBody(billeBodyDef);
		
		//Créer la b2Fixture de la bille
		let billefixDef = new b2FixtureDef();
		billefixDef.shape = new b2CircleShape(_radius/scale);
		billefixDef.density  = _density;
		billefixDef.friction = 10;
		billefixDef.restitution = _restitution;
		
		//création de la fixture
		let billeFix = billeBody.CreateFixture(billefixDef);
		billeFix.SetUserData({name : "bille"});
		
		return billeBody;
	}

    
    
	function CreateTriangle(_x,_y){
		//créer la "matière" (b2body) pour le triangle
		let triBodyDef = new b2BodyDef();
		triBodyDef.position.Set(_x/scale,_y/scale);
		triBodyDef.type = b2Body.b2_static;
		let triBody = world.CreateBody(triBodyDef);
		
		//Créer la b2Fixture de la bille
		let trifixDef = new b2FixtureDef();
		trifixDef.shape = new b2PolygonShape();
		
		let trifixDef2 = new b2FixtureDef();
		trifixDef2.shape = new b2PolygonShape();
		
		let trifixDef3 = new b2FixtureDef();
		trifixDef3.shape = new b2PolygonShape();
		
		let tabVec = [
			new b2Vec2(0,0),
			new b2Vec2(1,1),
			new b2Vec2(-1,1)
		];
		
		let tabVec2 = [
			new b2Vec2(-1,1),
			new b2Vec2(0,2),
			new b2Vec2(-2,2)
		];
		
		let tabVec3 = [
			new b2Vec2(1,1),
			new b2Vec2(2,2),
			new b2Vec2(0,2)
		];
		
		trifixDef.shape.SetAsArray(tabVec,3);
		trifixDef2.shape.SetAsArray(tabVec2,3);
		trifixDef3.shape.SetAsArray(tabVec3,3);
		
		trifixDef.density  = 5;
		trifixDef.friction = 0.3;
		trifixDef.restitution = 1;
		
		trifixDef2.density  = 5;
		trifixDef2.friction = 0.3;
		trifixDef2.restitution = 1;
		
		trifixDef3.density  = 5;
		trifixDef3.friction = 0.3;
		trifixDef3.restitution = 1;
		
		triBody.CreateFixture(trifixDef);
		triBody.CreateFixture(trifixDef2);
		triBody.CreateFixture(trifixDef3);
		
		triBody.SetAngularVelocity(4);
    }
    
    function CreateMisille(_x,_y){
		//créer la "matière" (b2body) pour le triangle
		let MisBodyDef = new b2BodyDef();
		MisBodyDef.position.Set(_x/taille,_y/taille);
		MisBodyDef.type = b2Body.b2_dynamic;
		let MisBody = world.CreateBody(triBodyDef);
		
		//Créer la b2Fixture de la bille
		let MisfixDef = new b2FixtureDef();
		MisfixDef.shape = new b2PolygonShape();
		
		let MisfixDef2 = new b2FixtureDef();
        MisfixDef2.shape = new b2PolygonShape();
		
		let MisfixDef3 = new b2FixtureDef();
        MisfixDef3.shape = new b2PolygonShape();
        
        MisBody.CreateFixture(MisfixDef);
		MisBody.CreateFixture(MisfixDef2);
		MisBody.CreateFixture(MisfixDef3);
		
        MisBody.SetAngularVelocity(4);
    }



	//zoom pour avoir des tailles
    let scale = 30;
    let taille = 30
	
	//créer le monde
	let gravity = new b2Vec2(0,10);
	var world = new b2World(gravity);
	
	//créer la "matière" pour le sol
	let groundBodyDef = new b2BodyDef();
	groundBodyDef.position.Set(0/scale,600/scale);
	groundBodyDef.type = b2Body.b2_staticBody;
	let groundBody = world.CreateBody(groundBodyDef);
	
	//Créer la fixture du sol
	var fixDef = new b2FixtureDef();
	//fixDef.shape = new b2CircleShape(50);
	fixDef.friction = 100;
	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(10000/scale, 100/scale);
    groundBody.CreateFixture(fixDef);

    // Cree un mur 



	//Ajout des objets dynamiques
	//b est le b2body de la bille
    let b = CreateBall(100,100,20,1,0);
    let a = CreateTriangle(20,20);
    let c = CreateMisille(50,60);
	//let force = new b2Vec2(1,0);
	//let point = b.GetPosition();
	//b.ApplyImpulse(force, point);
	
	//collision avec le sol
	//on crée un listener
	let contactListener = new b2ContactListener();
	contactListener.BeginContact = (_contact) => {
		console.log("contact");
		let fixA = _contact.GetFixtureA();
		let fixB = _contact.GetFixtureB();
		
		if(fixB.GetUserData().name == "bille"){
			console.log("fixB est la bille");
		}
		
		//on impulse vers la droite
		let force = new b2Vec2(1,0);
		let point = b.GetPosition();
		b.ApplyImpulse(force, point);
    };
    
















	//on ajoute le listener
	world.SetContactListener(contactListener);
	
	//préparer la simulation
	let timeStep = 1/60;	
	
	// Définir la méthode d'affichage du débug
	var debugDraw = new b2DebugDraw();
	// Définir les propriétés d'affichage du débug
	debugDraw.SetSprite(context);      // contexte
	debugDraw.SetFillAlpha(0.3);       // transparence
	debugDraw.SetLineThickness(1.0);   // épaisseur du trait
	debugDraw.SetDrawScale(scale); 	   //zoom sur l'affichage
	// Affecter la méthode de d'affichage du débug au monde 2dbox
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
	
	window.setInterval(()=>{
		world.Step(timeStep,10,10);
		world.DrawDebugData();
		world.ClearForces();
		//let pos = billeBody.GetPosition();
		//console.log(pos.y);
	},100/6);
};