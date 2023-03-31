# IMPORT PACKAGES
library(forecast)

# INGEST DATASET
data <- read.csv("dataset.csv")

# FORMAT DATASET
data$SystemCodeNumber <- as.factor(data$SystemCodeNumber)
data$LastUpdated <- as.Date(data$LastUpdated)

# EXTRACT DATA FOR LOT 1
lot1Capacity <- 577
lot1NumberOfObservations <- table(data$SystemCodeNumber)[1]
lot1Data <- data[1:lot1NumberOfObservations, 3:4]

# LOT 1 FORECASTING MODEL
lot1TrainingData <- lot1Data[1:1188, ]
lot1TimeSeriesObject <- ts(lot1TrainingData$Occupancy, start = 0, end = 69, 
	frequency = 18)
lot1ARIMAModel <- auto.arima(lot1TimeSeriesObject)

# PREDICTION FUNCTION
predictLot1Occupancy <- function(fractionOfDay) {
	prediction <- predict(lot1ARIMAModel, fractionOfDay)
	sprintf("Occupancy: %d\n", ceiling(prediction$pred[fractionOfDay]))
	sprintf("Free Spaces: %d\n", lot1Capacity - 
		ceiling(prediction$pred[fractionOfDay]))
}

# COMMAND LINE ARGUMENTS
args <- commandArgs(trailingOnly = TRUE)
predictLot1Occupancy(as.integer(args[1]))